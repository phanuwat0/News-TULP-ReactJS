import {
	Form,
	useLoaderData,
	useSearchParams,
	useSubmit,
} from 'react-router-dom'
import Post from './Post'
import './LikedPage.css'

import React, { useState, useEffect } from 'react'
const LikedPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const q = searchParams.get('q')
	console.log(q)
	const submit = useSubmit()

	const resetSearch = (e) => {
		const param = searchParams.get('q')
		if (param) {
			searchParams.delete('q')
			setSearchParams(searchParams)
		}
	}

	
	const posts = useLoaderData()

	const [likedPosts, setLikedPosts] = useState([])
	useEffect(() => {
		const filteredPosts = q
			? posts.filter(
					(e) =>
						e.name.toLowerCase().includes(q.toLowerCase()) && e.liked === true
			  )
			: posts.filter((e) => e.liked === true)
		setLikedPosts(filteredPosts)
	}, [q, posts])

	
	const list =
		likedPosts && likedPosts.length > 0
			? likedPosts.map((e) => <Post key={e.id} post={e} />)
			: null

	return (
		<>
			<Form id="search-form" role="search">
				<fieldset>
					<legend></legend>
					<input
						id="q"
						placeholder="Search"
						type="search"
						name="q"
						defaultValue={q}
						onChange={(event) => {
							console.log('target form', event.currentTarget.form)
							submit(event.currentTarget.form)
						}}
					/>
					<input type="reset" onClick={resetSearch} />
				</fieldset>
			</Form>
			<hr />
			{list ? <ul className="list-item">{list}</ul> : 'ยังไม่มีกิจกรรมที่คุณถูกใจ'}
		</>
	)
}

export default LikedPage

export const postsLoader = async () => {
	// const res = await getPosts();
	const res = await fetch('/api/posts')
	if (!res.ok) {
		throw Error('Could not fetch the posts')
	}
	return res.json()
}



