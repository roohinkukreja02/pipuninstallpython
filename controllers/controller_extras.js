const models_alumni=require("../models/models_alumni");


async function search_alumni(req,res){
    const searchTerm = req.body.query;

  try {
    // Search for users with a case-insensitive match using regex
    const users = await models_alumni.find({
      first_name: { $regex: searchTerm, $options: 'i' }, // 'i' makes it case-insensitive
    });
    console.log(req.session.user1.email);
    res.json(users); // Send matching users as JSON response

  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred during search');
  }

};

async function sort_alumni(req,res){
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
    const users = await models_alumni.find(sortFilter).sort({ city: 1, domain: 1, grad_year });
     // Adjust sorting criteria as needed
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred during sorting');
  }
}



module.exports={search_alumni, sort_alumni};