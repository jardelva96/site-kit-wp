/**
 * WiFi Lab application demo.
 */

/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { accessPoints, incidents, scenarios, sites, testQueue } from './data';

const styles = {
	page: {
		fontFamily: 'Google Sans, Arial, sans-serif',
		background:
			'linear-gradient(180deg, #0b1020 0%, #11192f 50%, #f5f7fb 50%)',
		minHeight: '100vh',
		padding: '32px 24px 64px',
		color: '#10213a',
	},
	container: {
		maxWidth: '1280px',
		margin: '0 auto',
	},
	hero: {
		background:
			'radial-gradient(circle at top left, #274690 0%, #13213f 55%, #0b1020 100%)',
		borderRadius: '24px',
		padding: '32px',
		color: '#fff',
		boxShadow: '0 24px 60px rgba(7, 15, 32, 0.38)',
	},
	badge: {
		display: 'inline-flex',
		padding: '6px 12px',
		borderRadius: '999px',
		background: 'rgba(255,255,255,0.1)',
		fontSize: '12px',
		letterSpacing: '0.04em',
		textTransform: 'uppercase',
		marginBottom: '16px',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
		gap: '16px',
		marginTop: '24px',
	},
	card: {
		background: '#fff',
		borderRadius: '20px',
		padding: '20px',
		boxShadow: '0 18px 40px rgba(18, 35, 63, 0.08)',
	},
	sectionTitle: {
		fontSize: '24px',
		fontWeight: 700,
		margin: '0 0 8px',
	},
	muted: {
		color: '#52627a',
		lineHeight: 1.5,
	},
	statValue: {
		fontSize: '34px',
		fontWeight: 700,
		margin: '6px 0',
	},
	tabs: {
		display: 'flex',
		gap: '12px',
		flexWrap: 'wrap',
		margin: '28px 0 20px',
	},
	tab: ( active ) => ( {
		padding: '12px 16px',
		borderRadius: '14px',
		border: active ? '1px solid #274690' : '1px solid #d9e0eb',
		background: active ? '#eaf1ff' : '#fff',
		color: active ? '#163978' : '#44546b',
		fontWeight: 600,
		cursor: 'pointer',
	} ),
	flex: {
		display: 'flex',
		justifyContent: 'space-between',
		gap: '16px',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	progressTrack: {
		height: '10px',
		borderRadius: '999px',
		background: '#e8edf5',
		overflow: 'hidden',
	},
	progressBar: ( value, color = '#274690' ) => ( {
		width: `${ value }%`,
		height: '100%',
		background: color,
		borderRadius: '999px',
	} ),
	list: {
		display: 'grid',
		gap: '14px',
		marginTop: '16px',
	},
	twoColumn: {
		display: 'grid',
		gridTemplateColumns: '1.5fr 1fr',
		gap: '16px',
		marginTop: '16px',
	},
	table: {
		width: '100%',
		borderCollapse: 'collapse',
		fontSize: '14px',
	},
	cell: {
		padding: '12px 0',
		borderBottom: '1px solid #edf1f7',
		textAlign: 'left',
		verticalAlign: 'top',
	},
	siteSelector: {
		display: 'flex',
		gap: '10px',
		flexWrap: 'wrap',
		marginTop: '8px',
	},
};

function getToneColors( tone ) {
	if ( tone === 'Critical' ) {
		return {
			background: '#ffe5e8',
			color: '#b42318',
		};
	}

	if (
		tone === 'Needs attention' ||
		tone === 'High' ||
		tone === 'Investigate' ||
		tone === 'Medium' ||
		tone === 'Running' ||
		tone === 'Queued'
	) {
		return {
			background: '#fff1d6',
			color: '#9a6700',
		};
	}

	if ( tone === 'Performance' || tone === 'Coverage' || tone === 'RF' ) {
		return {
			background: '#edf3ff',
			color: '#1d4ed8',
		};
	}

	return {
		background: '#e4f7eb',
		color: '#117a37',
	};
}

function getQueueTone( state ) {
	if ( state === 'Queued' ) {
		return 'Queued';
	}

	if ( state === 'Completed' ) {
		return 'Healthy';
	}

	return 'Running';
}

function pillStyle( tone ) {
	const colors = getToneColors( tone );

	return {
		display: 'inline-flex',
		padding: '6px 10px',
		borderRadius: '999px',
		fontSize: '12px',
		fontWeight: 700,
		background: colors.background,
		color: colors.color,
	};
}

function MetricCard( { label, value, suffix, tone, helper } ) {
	return (
		<div style={ styles.card }>
			<div style={ styles.flex }>
				<div>
					<div style={ styles.muted }>{ label }</div>
					<div style={ styles.statValue }>
						{ value }
						{ suffix ? (
							<span style={ { fontSize: '20px' } }>
								{ ' ' }
								{ suffix }
							</span>
						) : null }
					</div>
				</div>
				{ tone ? (
					<span style={ pillStyle( tone ) }>{ tone }</span>
				) : null }
			</div>
			{ helper ? (
				<div style={ { ...styles.muted, marginTop: '10px' } }>
					{ helper }
				</div>
			) : null }
		</div>
	);
}

function ScenarioCard( { scenario, active, onSelect } ) {
	return (
		<button
			type="button"
			onClick={ () => onSelect( scenario.id ) }
			style={ {
				...styles.card,
				textAlign: 'left',
				border: active ? '2px solid #274690' : '2px solid transparent',
				cursor: 'pointer',
			} }
		>
			<div style={ styles.flex }>
				<strong>{ scenario.name }</strong>
				<span style={ pillStyle( scenario.focus ) }>
					{ scenario.focus }
				</span>
			</div>
			<p style={ { ...styles.muted, margin: '12px 0' } }>
				{ scenario.description }
			</p>
			<div style={ styles.muted }>
				Typical run time: { scenario.duration }
			</div>
		</button>
	);
}

export default function WiFiLabApp() {
	const [ selectedSiteID, setSelectedSiteID ] = useState( sites[ 0 ].id );
	const [ selectedScenarioID, setSelectedScenarioID ] = useState(
		scenarios[ 0 ].id
	);
	const selectedSite = useMemo(
		() =>
			sites.find( ( site ) => site.id === selectedSiteID ) || sites[ 0 ],
		[ selectedSiteID ]
	);
	const selectedScenario = useMemo(
		() =>
			scenarios.find(
				( scenario ) => scenario.id === selectedScenarioID
			) || scenarios[ 0 ],
		[ selectedScenarioID ]
	);
	const healthScore = Math.round(
		( selectedSite.coverage + selectedSite.throughput / 7 ) / 2 +
			( 100 - selectedSite.packetLoss * 12 ) / 2
	);
	const recommendations = useMemo(
		() => [
			`Prioritize a ${ selectedScenario.name.toLowerCase() } for ${
				selectedSite.name
			} to validate current RF behavior.`,
			`Review channel plan ${ selectedSite.channelPlan.join(
				', '
			) } and compare utilization against neighboring AP groups.`,
			`Export the latest evidence pack after ${ selectedSite.testsRun } executed tests for stakeholder review.`,
		],
		[ selectedScenario.name, selectedSite ]
	);

	return (
		<div style={ styles.page }>
			<div style={ styles.container }>
				<section style={ styles.hero }>
					<div style={ styles.badge }>
						WiFi Lab / Advanced Test Console
					</div>
					<div style={ styles.flex }>
						<div style={ { maxWidth: '720px' } }>
							<h1
								style={ {
									fontSize: '42px',
									lineHeight: 1.1,
									margin: '0 0 14px',
								} }
							>
								A full Wi‑Fi validation app for coverage, speed,
								roaming and RF diagnostics.
							</h1>
							<p
								style={ {
									fontSize: '17px',
									lineHeight: 1.7,
									color: 'rgba(255,255,255,0.86)',
									margin: 0,
								} }
							>
								Built as a command center for wireless teams:
								compare sites, pick a test workflow, track live
								execution, and inspect network health from the
								same dashboard.
							</p>
						</div>
						<div style={ { minWidth: '260px' } }>
							<div
								style={ {
									fontSize: '14px',
									color: 'rgba(255,255,255,0.7)',
								} }
							>
								Active Site
							</div>
							<div style={ styles.siteSelector }>
								{ sites.map( ( site ) => (
									<button
										key={ site.id }
										type="button"
										onClick={ () =>
											setSelectedSiteID( site.id )
										}
										style={ {
											padding: '10px 12px',
											borderRadius: '12px',
											border:
												selectedSiteID === site.id
													? '1px solid #ffffff'
													: '1px solid rgba(255,255,255,0.15)',
											background:
												selectedSiteID === site.id
													? 'rgba(255,255,255,0.18)'
													: 'rgba(255,255,255,0.08)',
											color: '#fff',
											cursor: 'pointer',
										} }
									>
										{ site.name }
									</button>
								) ) }
							</div>
						</div>
					</div>
					<div style={ styles.grid }>
						<MetricCard
							label="Wireless health score"
							value={ healthScore }
							tone={ selectedSite.status }
							helper="Composite score based on coverage, throughput, retries and packet integrity."
						/>
						<MetricCard
							label="Median throughput"
							value={ selectedSite.throughput }
							suffix="Mbps"
							helper="Combined uplink/downlink benchmark across recent test runs."
						/>
						<MetricCard
							label="Latency / packet loss"
							value={ selectedSite.latency }
							suffix="ms"
							helper={ `${ selectedSite.packetLoss }% loss detected across synthetic transactions.` }
						/>
						<MetricCard
							label="Connected clients"
							value={ selectedSite.clients }
							helper={ `${ selectedSite.coverage }% validated coverage across all required zones.` }
						/>
					</div>
				</section>

				<div style={ styles.tabs }>
					{ scenarios.map( ( scenario ) => (
						<button
							key={ scenario.id }
							type="button"
							onClick={ () =>
								setSelectedScenarioID( scenario.id )
							}
							style={ styles.tab(
								selectedScenarioID === scenario.id
							) }
						>
							{ scenario.name }
						</button>
					) ) }
				</div>

				<section style={ styles.grid }>
					{ scenarios.map( ( scenario ) => (
						<ScenarioCard
							key={ scenario.id }
							scenario={ scenario }
							active={ selectedScenarioID === scenario.id }
							onSelect={ setSelectedScenarioID }
						/>
					) ) }
				</section>

				<section style={ styles.twoColumn }>
					<div style={ styles.card }>
						<div style={ styles.flex }>
							<div>
								<h2 style={ styles.sectionTitle }>
									{ selectedScenario.name } playbook
								</h2>
								<p style={ styles.muted }>
									{ selectedScenario.description }
								</p>
							</div>
							<span
								style={ pillStyle( selectedSite.interference ) }
							>
								{ selectedSite.interference } interference
							</span>
						</div>
						<div style={ styles.list }>
							{ recommendations.map( ( item ) => (
								<div
									key={ item }
									style={ {
										padding: '14px 16px',
										background: '#f6f9fc',
										borderRadius: '14px',
									} }
								>
									{ item }
								</div>
							) ) }
						</div>
						<div style={ { marginTop: '20px' } }>
							<div style={ styles.flex }>
								<strong>
									Current site validation progress
								</strong>
								<span>
									{ selectedSite.testsRun } tests executed
								</span>
							</div>
							<div
								style={ {
									...styles.progressTrack,
									marginTop: '10px',
								} }
							>
								<div
									style={ styles.progressBar(
										selectedSite.score,
										'#274690'
									) }
								/>
							</div>
						</div>
					</div>

					<div style={ styles.card }>
						<h2 style={ styles.sectionTitle }>Site alerts</h2>
						<div style={ styles.list }>
							{ selectedSite.alerts.map( ( alert ) => (
								<div
									key={ alert }
									style={ {
										padding: '14px 16px',
										background: '#fff7ea',
										borderRadius: '14px',
									} }
								>
									{ alert }
								</div>
							) ) }
						</div>
						<div style={ { marginTop: '20px' } }>
							<strong>Channel plan</strong>
							<div
								style={ {
									display: 'flex',
									gap: '8px',
									flexWrap: 'wrap',
									marginTop: '10px',
								} }
							>
								{ selectedSite.channelPlan.map( ( channel ) => (
									<span
										key={ channel }
										style={ {
											...pillStyle( 'Performance' ),
											background: '#edf3ff',
											color: '#1d4ed8',
										} }
									>
										Ch { channel }
									</span>
								) ) }
							</div>
						</div>
					</div>
				</section>

				<section style={ styles.twoColumn }>
					<div style={ styles.card }>
						<div style={ styles.flex }>
							<h2 style={ styles.sectionTitle }>Test queue</h2>
							<span style={ pillStyle( 'Healthy' ) }>
								Live orchestration
							</span>
						</div>
						<table style={ styles.table }>
							<thead>
								<tr>
									<th style={ styles.cell }>Test</th>
									<th style={ styles.cell }>Owner</th>
									<th style={ styles.cell }>Status</th>
								</tr>
							</thead>
							<tbody>
								{ testQueue.map( ( test ) => (
									<tr key={ test.id }>
										<td style={ styles.cell }>
											<div>
												<strong>{ test.name }</strong>
											</div>
											<div style={ styles.muted }>
												{ test.type }
											</div>
											<div
												style={ {
													...styles.progressTrack,
													marginTop: '8px',
												} }
											>
												<div
													style={ styles.progressBar(
														test.progress,
														test.state ===
															'Completed'
															? '#117a37'
															: '#274690'
													) }
												/>
											</div>
										</td>
										<td style={ styles.cell }>
											{ test.owner }
										</td>
										<td style={ styles.cell }>
											<span
												style={ pillStyle(
													getQueueTone( test.state )
												) }
											>
												{ test.state }
											</span>
										</td>
									</tr>
								) ) }
							</tbody>
						</table>
					</div>

					<div style={ styles.card }>
						<h2 style={ styles.sectionTitle }>Incident feed</h2>
						<div style={ styles.list }>
							{ incidents.map( ( incident ) => (
								<div
									key={ incident.title }
									style={ {
										border: '1px solid #edf1f7',
										borderRadius: '16px',
										padding: '14px 16px',
									} }
								>
									<div style={ styles.flex }>
										<strong>{ incident.title }</strong>
										<span
											style={ pillStyle(
												incident.severity
											) }
										>
											{ incident.severity }
										</span>
									</div>
									<div
										style={ {
											...styles.muted,
											marginTop: '6px',
										} }
									>
										{ incident.location }
									</div>
									<div style={ { marginTop: '10px' } }>
										{ incident.action }
									</div>
								</div>
							) ) }
						</div>
					</div>
				</section>

				<section style={ styles.card }>
					<div style={ styles.flex }>
						<div>
							<h2 style={ styles.sectionTitle }>
								Access point inventory
							</h2>
							<p style={ styles.muted }>
								Track AP health, load distribution and
								utilization patterns before exporting evidence.
							</p>
						</div>
						<span style={ pillStyle( 'Healthy' ) }>
							4 monitored APs
						</span>
					</div>
					<table style={ styles.table }>
						<thead>
							<tr>
								<th style={ styles.cell }>Access point</th>
								<th style={ styles.cell }>Band</th>
								<th style={ styles.cell }>Clients</th>
								<th style={ styles.cell }>Utilization</th>
								<th style={ styles.cell }>Health</th>
							</tr>
						</thead>
						<tbody>
							{ accessPoints.map( ( ap ) => (
								<tr key={ ap.name }>
									<td style={ styles.cell }>
										<div>
											<strong>{ ap.name }</strong>
										</div>
										<div style={ styles.muted }>
											{ ap.zone }
										</div>
									</td>
									<td style={ styles.cell }>{ ap.band }</td>
									<td style={ styles.cell }>
										{ ap.clients }
									</td>
									<td style={ styles.cell }>
										<div>{ ap.utilization }%</div>
										<div
											style={ {
												...styles.progressTrack,
												marginTop: '8px',
											} }
										>
											<div
												style={ styles.progressBar(
													ap.utilization,
													ap.utilization > 75
														? '#b42318'
														: '#274690'
												) }
											/>
										</div>
									</td>
									<td style={ styles.cell }>
										<span style={ pillStyle( ap.health ) }>
											{ ap.health }
										</span>
									</td>
								</tr>
							) ) }
						</tbody>
					</table>
				</section>
			</div>
		</div>
	);
}
