const models_alumni=require("../models/models_alumni");
const Student=require("../models/models_student");



async function search_alumni(req, res) {
    // Extract the search term string
    const {id} = req.params;
    const searchTerm = req.query.query;
    const student = await Student.findById(id)

    try {
        // Ensure the searchTerm is a valid string
        if (typeof searchTerm !== 'string' || searchTerm.trim() === '') {
            return res.status(400).json({ error: "Invalid search term" });
        }

        // Perform the search with regex, case-insensitive ('i' flag)
        const alumni = await models_alumni.find({
            first_name: { $regex: new RegExp(searchTerm, 'i') } // 'i' makes it case-insensitive
        });

        // Return the matching users as a JSON response
        res.render("student_dash_alum_connect", {alumni, student});

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during search');
    }
}

/*
async function sort_alumni(req,res){
    console.log("control reached");
    const { city, domain, grad_year } = req.body;

  // Construct the sorting filter
  let sortFilter = {};
  if (city) {
    sortFilter.city = city;
  }
  if (domain) {
    sortFilter.domain = domain;
  }
  if (grad_year) {
    sortFilter.grad_year = grad_year;
  }

  try {
    const alumni = await models_alumni.find(sortFilter).sort({ city: 1, domain: 1, grad_year:1 });
     // Adjust sorting criteria as needed
    res.render("student_dash_alum_connect", ({alumni}));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred during sorting');
  }
}
*/
async function sort_alumni(req, res) {
  const {id} = req.params;
  const student = await Student.findById(id)
  
    console.log("control reached");
    const { city, domain, grad_year } = req.query;
    console.log(grad_year);
    // Construct the filter to match the provided dropdown fields
    let filter = {};
    if (city) {
        filter.city = city; // Matches city exactly
    }
    if (domain) {
        filter.domain = domain; // Matches domain exactly
    }
    if (grad_year) {
        filter.grad_year = grad_year; // Matches grad_year exactly
    }

    try {
        // Find alumni with matching fields and then sort by city, domain, and grad_year
        const alumni = await models_alumni.find(filter).sort({ city: 1, domain: 1, grad_year: 1 });
        
        // Render only when the fields match
        res.render("student_dash_alum_connect", { alumni,student });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during sorting');
    }
}



module.exports={search_alumni, sort_alumni};