import { Outlet, useNavigation } from 'react-router-dom'
import Spinner from '../component/Spinner'

const PostLayout = () => {
	const navigation = useNavigation()
	return (
		<>
		
			<div>
				{navigation.state === 'loading' ? <Spinner /> : ''} <Outlet />
			</div>
		</>
	)
}

export default PostLayout;
