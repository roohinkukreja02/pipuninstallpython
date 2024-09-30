const models_alumni=require("../models/models_alumni");


async function search_alumni(req,res){
    const searchTerm = req.body.query;

  try {
    // Search for users with a case-insensitive match using regex
    const users = await models_alumni.find({
      first_name: { $regex: searchTerm, $options: 'i' }, // 'i' makes it case-insensitive
    });

    res.json(users); // Send matching users as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred during search');
  }

};



module.exports={search_alumni};