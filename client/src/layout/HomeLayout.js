import { Outlet, useNavigation } from 'react-router-dom'
import Spinner from '../component/Spinner'

const HomeLayout = () => {
	const navigation = useNavigation()
	return (
		<>
			<div>
				{navigation.state === 'loading' ? <Spinner /> : ''} <Outlet />
			</div>
		</>
	)
}

export default HomeLayout
