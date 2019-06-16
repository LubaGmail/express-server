const express = require('express');
const Joi = require('@hapi/joi'); // class is returned
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const courses = [
    {
        id: 1,
        name: "course1"
    }, {
        id: 2,
        name: "course2"
    }, {
        id: 3,
        name: "course3"
    }
];

app.get('/', (req, res) => {
    res.send('Not a hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
})

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
});

app.get('/api/courses/:id', (req, res) => {
    // res.send(req.query);        
    // http://localhost:5000/api/courses/1?sortBy=name

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404)
                  .send(`Course with id: ${req.params.id} not found`);
    }

    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);       // result.error

    if (error) {
        return res.status(400)    
                  .send(error.details[0].message);
    }

    const course = {
        id: req.body.id,
        name: req.body.name
    };
    courses.push(course);

    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404)
                  .send(`Course with id: ${req.params.id} not found`);
    }

    const {error} = validateCourse(req.body);       // result.error
    if (error) {
        return res.status(400)
                  .send(error.details[0].message);
    }
    course.name = req.body.name;

    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course ) {
        return res.status(404).send(`Course with id: ${req.params.id} not found`);
    }

    // splice the course from the array
    const index = courses.indexOf(course);  
    const result = courses.splice(index, 1);
 
    // send res with the course

    res.send('course deleted: ' + course.id);   
});

validateCourse = (course) => {
    const schema = Joi.object().keys({ name: Joi.string().alphanum().min(2).max(30).required() });

    return Joi.validate({
        name: course.name
    }, schema);
}

app.listen(port, () => {
    console.log(`Express-Server is listeneing on port ${port}...`);
})
