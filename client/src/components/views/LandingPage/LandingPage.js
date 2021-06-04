import React from 'react'
import { Carousel } from 'antd'
import './LandingPage.css'

function LandingPage() {



	return (
		<div>
			<Carousel autoplay>
				<div>
					<div className={'carousel_cheonan'}>
						<div className={'text_container'}>
							<h1 style={{ color: 'white' }}>인생뮤직 천안점 오픈!</h1>
							<p style={{ color: '#F0B8C8' }}>무료 체험 레슨과 오픈 기념 수강료 할인까지!</p>
						</div>
						<div className={'img_container'}>
							<img src="https://i.imgur.com/5uE4syc.jpg" ></img>
						</div>
					</div>
				</div>
				<div>
					<div className={'carousel_main'}>
						<div className={'text_container'}>
							<h1 style={{ color: 'white' }}>인생뮤직에서는 언제나 체험레슨이 무료!</h1>
							<p style={{ color: 'grey' }}>100% 무료 체험레슨으로 부담 없이 방문해보세요!</p>
						</div>
						<div className={'img_container'}>
							<img src="https://i.imgur.com/MUk4X9T.png" ></img>
						</div>
					</div>
				</div>
			</Carousel>
		</div>
	)
}

export default LandingPage
