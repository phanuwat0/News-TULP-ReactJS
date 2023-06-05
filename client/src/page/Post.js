import { useState } from 'react'
import './Post.css'

const Post = ({ post, onLike }) => {
	const { id, name, category, details, date, time, link, img, liked } = post

	const [isLiked, setIsLiked] = useState(liked)

	const handleLikeClick = () => {
		const updatedLiked = !isLiked
		fetch(`/api/posts/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ liked: updatedLiked }),
		})
			.then((response) => response.json())
			.then((data) => {
				setIsLiked(updatedLiked)
				console.log(data)
			})
			.catch((error) => console.log(error))
	}

	return (
    <div data-replace method="post" className="card-container">
      <div className="card">
        <div className="topic">
          <h2>{name}</h2>
          <button className='love' type="submit" onClick={handleLikeClick}>
            {isLiked ? "❤" : "♡"}
          </button>
        </div>
        <div className="card-image">
          <img src={img} alt={name} />
        </div>
        <div className="card-content">
          <div>
            <span>Category:</span> {category}
          </div>
          <div>
            <span>details:</span> {details}
          </div>
          <div>
            <span>deadline:</span> วันที่ {date} เวลา {time}
          </div>
          <div>
            <a href={link}>link:{link}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post
