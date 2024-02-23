import React, { useState } from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent';
import ShowCourseComponent from './components/ShowCourseComponent';
import UserCartComponent from './components/UserCartComponent';

function App() {
	const [courses, setCourses] = useState([
		{ id: 1, 
		name: 'NIKE T-shirt', 
		price: 1499, 
		image: 
'https://th.bing.com/th/id/OIP.i4X2-NCPB2pVIXYpuTlEVAHaLT?w=142&h=216&c=7&r=0&o=5&dpr=1.3&pid=1.7'
		},
		{ id: 2, 
		name: 'ADIDAS Bag', 
		price: 1699, 
		image: 
'https://th.bing.com/th/id/OIP.93kmtRdw6VpIFrjGbDCetAHaHa?w=201&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7'
		},
		{ id: 3, 
		name: 'HP 15 laptop', 
		price: 77999, 
		image: 
'https://th.bing.com/th/id/OIP.aFywxx2DuURHemZu4OMUtAHaHa?w=190&h=190&c=7&r=0&o=5&dpr=1.3&pid=1.7'
		}
	]);

	const [cartCourses, setCartCourses] = useState([]);
	const [searchCourse, setSearchCourse] = useState('');

	const addCourseToCartFunction = (course) => {
		const alreadyCourses = cartCourses
							.find(item => item.product.id === course.id);
		if (alreadyCourses) {
			const latestCartUpdate = cartCourses.map(item =>
				item.product.id === course.id ? { 
				...item, quantity: item.quantity + 1 } 
				: item
			);
			setCartCourses(latestCartUpdate);
		} else {
			setCartCourses([...cartCourses, {product: course, quantity: 1}]);
		}
	};

	const deleteCourseFromCartFunction = (Course) => {
		const updatedCart = cartCourses
							.filter(item => item.product.id !== Course.id);
		setCartCourses(updatedCart);
	};

	const totalAmountCalculationFunction = () => {
		return cartCourses
			.reduce((total, item) => 
						total + item.product.price * item.quantity, 0);
	};

	const courseSearchUserFunction = (event) => {
		setSearchCourse(event.target.value);
	};

	const filterCourseFunction = courses.filter((course) =>
		course.name.toLowerCase().includes(searchCourse.toLowerCase())
	);

	return (
		<div className="App">
			<SearchComponent searchCourse={searchCourse} 
							courseSearchUserFunction=
								{courseSearchUserFunction} />
			<main className="App-main">
				<ShowCourseComponent
					courses={courses}
					filterCourseFunction={filterCourseFunction}
					addCourseToCartFunction={addCourseToCartFunction}
				/>

				<UserCartComponent
					cartCourses={cartCourses}
					deleteCourseFromCartFunction={deleteCourseFromCartFunction}
					totalAmountCalculationFunction={
						totalAmountCalculationFunction
					}
					setCartCourses={setCartCourses}
				/>
			</main>
		</div>
	);
}

export default App;
