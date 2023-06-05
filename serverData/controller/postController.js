// Retrieve and return all posts from the const Posts.
import Posts from '../model/Post.js'

export const list = (req, res) => {
  Posts.find().then(result =>  res.json(result));
};

// add new post 
export const create = (req, res) => {
  Posts.insert(req.body).then(()=> {return res.send({success: "Create Successfully"})})
}

// Find a single post with an id
export const get = (req, res) => {
    const id = req.params.id;
    Posts.findOne(id)
   .then(post => {
      if(!post) {
        return res.status(404).send({
            error: "Post not found with id " + id
        });            
      }
      res.json(post); // default status = 200
    }).catch(err => {
      return res.status(500).send({
        error: "Error retrieving Post with id " + id
      });
    });
  };;
  
// Update a post identified by the id in the request
export const put = (req, res) => {
    // Validate Request
  const data = req.body || {};
  
    // if (!data || data.id != req.params.id) 
    //   return res.status(422).send({error: 'id must be alphanumeric.'});
    // Find Post and update it with the request body
    Posts.findAndUpdate(req.params.id,req.body,true)
    .then(post => {
      if(!post) {
        return res.status(404).send({
               error: "Post not found with id " + req.params.id
        });
      }
      res.send(post);
    }).catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
               error: "Post not found with id " + req.params.id
        });                
      }
      return res.status(500).send({
              error: "Error updating Post with id " + req.params.id
      });
    });
};
  


export const remove = (req, res) => {
  const data = req.body || {};
  if (!data || data.id != req.params.id)
    return res.status(422).send({error: 'id must be alphanumeric.'});
  Posts.delete(data.id).then(
    () => {
      return res.status(200).send({ success: true });
    }
  ).catch(() => {
    return res.status(404).send({
      error: "Post not found with id " + req.params.id
  });                
  })
}
