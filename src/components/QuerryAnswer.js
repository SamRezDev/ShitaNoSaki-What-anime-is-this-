import React, { useState, useEffect } from 'react';
import './QuerryAnswer.css';
export default function QuerryAnswer(props) {
	const [ Filter, setFilter ] = useState([]);
	const [ displayQuerryStyle, setdisplayQuerryStyle ] = useState(false);

	useEffect(
		() => {
			FilterResult();
		},
		[ props.Result.result, displayQuerryStyle, FilterResult ]
	);

	function FilterResult() {
		setdisplayQuerryStyle(false);
		if (props.Result.result === undefined || props.Result.result === null) {
			setdisplayQuerryStyle(false);
		} else {
			props.Result.result.map((element) => {
				if (Math.max(element.similarity)) {
					if (element.similarity > 0.92) {
						setFilter(element);
						setdisplayQuerryStyle(true);
					}
				}
			});
		}
	}

	if (props.Status === true) {
		return (
			<div className="QuerryContainerLoading">
				CURRENTLY SEARCHING{' '}
				<div className="lds-ripple">
					<div />
					<div />
				</div>
			</div>
		);
	} else {
		return (
			<div className="QuerryContainer">
				{displayQuerryStyle ? (
					<div className="AnswerTitle">
						{' '}
						Episode N°{Filter.episode} of<br /> <h1>{Filter.anilist.title.english}</h1>
					</div>
				) : (
					<div className="AnswerTitleNotEnough">
						{' '}
						We could not find a good enough result with your screenshot.
						<br /> To achieve <span>better result,</span> make sure your picture :{' '}
						<ul>
							{' '}
							<li>- Is of good quality </li> <li> - Covers the whole frame</li>{' '}
						</ul>{' '}
					</div>
				)}
			</div>
		);
	}
}
