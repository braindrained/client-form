// @flow
import React from 'react';
import PropTypes from 'prop-types';

const createPagerLinks = (pageCount: number, currentPage: Number) => {
	const pagerLinks = [];

	for (let i = 1; i <= pageCount; i += 1) {
		pagerLinks.push(
			{
				type: currentPage === i ? 'current' : null,
				page: i,
			}
		);
	}

	return pagerLinks;
};

class Pager extends React.Component<any, any> {

	static defaultProps = {
		total: null,
		itemPerPage: null,
		currentPage: null,
		onClick: null
	};

	state = {
		pagerLinks: createPagerLinks(Math.ceil(this.props.total / this.props.itemPerPage), this.props.currentPage),
		lastPageNumber: Math.ceil(this.props.total / this.props.itemPerPage)
	};

	componentWillReceiveProps(nextProps: Object) {
		this.setState({
			pagerLinks: createPagerLinks(Math.ceil(nextProps.total / nextProps.itemPerPage), nextProps.currentPage),
			lastPageNumber: Math.ceil(nextProps.total / nextProps.itemPerPage)
		});
	}

	onClick(page: number) {
		if (page > this.state.lastPageNumber) return null;
		if ((this.props.currentPage === 1 && page === 0) || (this.props.currentPage === 1 && page === 1)) return null;

		if (page <= this.state.lastPageNumber && this.props.currentPage !== this.state.lastPageNumber) {
			this.props.onClick(page);
		} else if (page === this.state.lastPageNumber && this.props.currentPage === this.state.lastPageNumber) {
			return null;
		} else {
			this.props.onClick(page);
		}
		return null;
	}

	render() {
		const { currentPage } = this.props;
		const { pagerLinks, lastPageNumber } = this.state;

		if (pagerLinks.length <= 1) return null;

		const pagerItems = [];
		pagerLinks.map((item, index) => {
			const key = `pgr_${index}`;
			if (item.type === 'current') {
				pagerItems.push(<li key={key} className="active noselect">{item.page}</li>);
			} else {
				pagerItems.push(<li {...{ key, className: 'noselect', onClick: this.onClick.bind(this, item.page) }}>{item.page}</li>);
			}
		});

		return (
			<div className="pager noselect">
				<div className="pager-container">
					<ul>
						<li {...{
							className: currentPage !== 1 ? 'noselect arrows' : 'noselect arrows opacity',
							onClick: () => { this.onClick(1); }
						}}>
							&laquo;
						</li>
						<li {...{
							className: currentPage !== 1 ? 'noselect arrows' : 'noselect arrows opacity',
							onClick: () => { this.onClick(parseInt(currentPage, 10) - 1); }
						}}>
							‹
						</li>
						{pagerItems}
						<li {...{
							className: currentPage !== lastPageNumber ? 'noselect arrows' : 'noselect arrows opacity',
							onClick: () => { this.onClick(parseInt(currentPage, 10) + 1); }
						}}>
							›
						</li>
						<li {...{
							className: currentPage !== lastPageNumber ? 'noselect arrows' : 'noselect arrows opacity',
							onClick: () => { this.onClick(lastPageNumber); }
						}}>
							&raquo;
						</li>
					</ul>
					<div className="pager-count">
						Pagina {currentPage} di {lastPageNumber}
					</div>
				</div>
			</div>
		);
	}
}

Pager.propTypes = {
	total: PropTypes.number,
	itemPerPage: PropTypes.number,
	currentPage: PropTypes.number,
	onClick: PropTypes.func
};

Pager.defaultProps = {
	total: null,
	itemPerPage: null,
	currentPage: null,
	onClick: null
};

export default Pager;
