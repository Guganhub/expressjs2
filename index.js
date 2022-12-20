const express= require('express')
const app=express()
app.use(express.json())
const port=5000

let students=[
    {
        name:"Gugan",
        email:"gugan@gmail.com",
        mobile:"9856321470",
        batch:"B40WD",
        mentor:"Nagarajan"
    },
    {
        name:"Rahul",
        email:"rahul@gmail.com",
        mobile:"9562156710",
        batch:"B40WD",
        mentor:"Nagarajan"
    }

]
app.get('/',(req,res)=>{
    res.send(
        `<h1>Welcome to express student management</h1>`
    )
    
})
app.get('/students',(req,res)=>{
    res.send(students)
})
app.get('/students/:id',(req,res)=>{
    if(req.params.id<students.length)
    {
    res.status(200).send(students[req.params.id])
    }
    else{
        res.status(200).send({
            message:"Invalid id"
        })
    }
})
app.post('/students',(req,res)=>{
    if(req.body.name && req.body.email && req.body.mobile)
    {
        let student=students.filter((e)=>e.email===req.body.email)
        if(student.length===0){
    students.push(req.body)
    res.status(200).send({
        
        message:"Student added successfully"
    })
    }
    else{
        res.status(400).send({
            message:`${req.body.email} already exists`
        })
    }
}
else{
    res.status(400).send({
        message:"Name mobile email mandatory"
    })
}
})
app.put('/students/:id',(req,res)=>{
    if(req.params.id<students.length){
        students.splice(req.params.id,1,req.body)
        res.status(200).send({
            message:"Details updated successfully"
        })
    }
    else{
        res.status(400).send({
            message:"Invalid id"
        })
    }
})
app.delete('/students/:id',(req,res)=>{
    if(req.params.id<students.length){
        students.splice(req.params.id,1)
        res.status(200).send({
            message:"Details deleted successfully"
        })
    }
    else{
        res.status(400).send({
            message:"Invalid id"
        })
    }
})

app.listen(port,()=>{
    console.log("app is listening to:"+port)
})