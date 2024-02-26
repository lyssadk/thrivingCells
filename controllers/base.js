// Purpose: To handle the base routes of the application
const baseController = {}

baseController.buildHome = async function(req, res){
  res.render("index", {title: "Home"})
}

module.exports = baseController