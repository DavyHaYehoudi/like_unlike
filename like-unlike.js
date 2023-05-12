module.exports.likePost = (req,res)=>{
    PostModel.findOne({_id: req.params.id})
        .then(post => {

            //L'utilisateur a-t-il déjà liké ?

            //oui
          if(post.likers.find(user => user === req.body.id)){
                PostModel.updateOne({_id:req.params.id}, 
                    {
                        $pull: { likers : req.body.id }
                    })
                    .then(() => { res.status(201).json({ message: 'Votre like/dislike a été pris en compte!' }); })
                    .catch((error) => { res.status(400).json({ error: error }); });
          } 
            //non
          else  {
            
            PostModel.updateOne({_id:req.params.id},
                    {
                        $push: { likers : req.body.id }
                    })
                    .then(() => { res.status(201).json({ message: 'Votre like/dislike a été pris en compte!' }); })
                    .catch((error) => { res.status(400).json({ error: error }); });
           }
         
        })  

        .catch(err=>res.status(404).json( err ))
}


//id ligne 6 et 16 c'est l'id de l'utilisateur qui souhaite like  et on l'obtient avec req.body.id ou selon req.body.userId etc...
//_id ligne 2, 6, 14 c'est celui du post que je veux like et on le passe dans l'URL donc on l'obtient avec req.params.id