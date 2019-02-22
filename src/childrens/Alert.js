// @flow
import React from 'react';
import ClickOutHandler from 'react-onclickout';

// flow-disable-next-line
import './Alert.scss';

export default class Alert extends React.Component<any, any> {

	getViewport = (viewport: Object) => {
		if (viewport.height === '' && document && document.documentElement) return { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };
		return viewport;
	}

	render() {
		const {
			closeActionOverlay, actionTitle, resetAction, handleAction,
			deleteError, confirmAction, whichAction, actionTextRed,
			actionTextBlack, successMessage, icon, loadSpinner, viewport,
			alertHeight, hideConfirm
		} = this.props;

		return (
			<div className="overlay-back alert">
				<ClickOutHandler onClickOut={() => { closeActionOverlay(); }}>
					<div {...{
						className: 'overlay-cont',
						style: {
							marginTop: (parseInt(this.getViewport(viewport).height, 10) - alertHeight) / 2,
							overflow: 'hidden',
							width: 450,
							height: alertHeight
						}
					}}>
						<div className="alert-head">
							<div {...{ className: 'alert-close', onClick: () => { closeActionOverlay(); } }} />
							<div className="alert-title noselect">{actionTitle}</div>
						</div>
						<div className="alert-icon">
							<img src={icon} alt="" />
						</div>
						<div className="overlay-data" style={{ padding: '0px 15px 15px' }}>
							<ClickOutHandler onClickOut={() => { resetAction(); }}>
								<div style={{ width: '100%', display: 'inline-block' }}>
									<div className="alert-text-red noselect">
										{actionTextRed}
									</div>
									<div className="alert-text-black noselect">
										{actionTextBlack}
									</div>
									{ handleAction && deleteError === null ?
										<div className="alert-actions">
											{ hideConfirm ?
												null :
												<div {...{
													className: loadSpinner ? 'btn btn-red spinner' : 'btn btn-red',
													onClick: () => { confirmAction(whichAction); }
												}}>
													Conferma
												</div>
											}
											<div {...{ className: 'alert-actions-cancel', onClick: () => { closeActionOverlay(); } }}>
												Annulla
											</div>
										</div>
										:
										handleAction && deleteError ?
											<div className="alert-actions">
												<div {...{
													onClick: () => { resetAction(); },
													className: 'btn btn-error noselect'
												}}>
													Errore nel salvataggio dei dati
												</div>
											</div>
											:
											handleAction && deleteError === false ?
												<div className="alert-actions">
													<div className="btn btn-succeed noselect">
														{successMessage}
													</div>
												</div>
												:
												null
									}
								</div>
							</ClickOutHandler>
						</div>
					</div>
				</ClickOutHandler>
			</div>
		);
	}
}
