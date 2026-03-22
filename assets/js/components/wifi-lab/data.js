/**
 * WiFi Lab demo data.
 */
export const sites = [
	{
		id: 'hq-5f',
		name: 'HQ - 5th Floor',
		status: 'Stable',
		score: 92,
		testsRun: 128,
		coverage: 98,
		interference: 'Low',
		clients: 184,
		throughput: 612,
		latency: 11,
		packetLoss: 0.3,
		channelPlan: [ '1', '6', '11', '36', '40', '44', '149' ],
		alerts: [
			'Roaming below 150 ms in all executive areas.',
			'6 GHz guest SSID is ready for rollout.',
		],
	},
	{
		id: 'warehouse',
		name: 'Warehouse',
		status: 'Needs attention',
		score: 74,
		testsRun: 96,
		coverage: 87,
		interference: 'Medium',
		clients: 143,
		throughput: 441,
		latency: 18,
		packetLoss: 1.2,
		channelPlan: [ '1', '11', '36', '48', '157' ],
		alerts: [
			'Forklift aisle B has RSSI under -67 dBm during busy hours.',
			'AP-17 reports elevated retry rate on channel 157.',
		],
	},
	{
		id: 'retail',
		name: 'Retail Store',
		status: 'Critical',
		score: 58,
		testsRun: 64,
		coverage: 79,
		interference: 'High',
		clients: 96,
		throughput: 219,
		latency: 32,
		packetLoss: 3.7,
		channelPlan: [ '6', '11', '44', '149' ],
		alerts: [
			'POS roaming failures exceeded threshold in checkout zone.',
			'Bluetooth beacon overlap is degrading the 2.4 GHz band.',
		],
	},
];

export const scenarios = [
	{
		id: 'coverage',
		name: 'Coverage Survey',
		description:
			'Heatmap-driven validation for RSSI, SNR, overlap and minimum cell edge requirements.',
		duration: '18 min',
		focus: 'Coverage',
	},
	{
		id: 'throughput',
		name: 'Throughput Benchmark',
		description:
			'Bidirectional speed, jitter, latency and packet loss tests inspired by iPerf-style workflows.',
		duration: '12 min',
		focus: 'Performance',
	},
	{
		id: 'roaming',
		name: 'Roaming Validation',
		description:
			'Transition timing, sticky clients and voice-ready fast-roam acceptance testing.',
		duration: '10 min',
		focus: 'Mobility',
	},
	{
		id: 'spectrum',
		name: 'Spectrum Analysis',
		description:
			'Channel utilization, co-channel interference and non-Wi-Fi noise diagnostics.',
		duration: '8 min',
		focus: 'RF',
	},
];

export const testQueue = [
	{
		id: 1,
		name: 'North corridor walk test',
		type: 'Coverage Survey',
		progress: 100,
		state: 'Completed',
		owner: 'Ana',
	},
	{
		id: 2,
		name: 'Checkout voice roaming',
		type: 'Roaming Validation',
		progress: 82,
		state: 'Running',
		owner: 'Bruno',
	},
	{
		id: 3,
		name: 'Warehouse shift throughput',
		type: 'Throughput Benchmark',
		progress: 56,
		state: 'Running',
		owner: 'Carla',
	},
	{
		id: 4,
		name: 'Guest SSID channel audit',
		type: 'Spectrum Analysis',
		progress: 0,
		state: 'Queued',
		owner: 'Diego',
	},
];

export const accessPoints = [
	{
		name: 'AP-05',
		zone: 'Executive wing',
		band: '6 GHz',
		clients: 27,
		utilization: 42,
		health: 'Healthy',
	},
	{
		name: 'AP-09',
		zone: 'Meeting block',
		band: '5 GHz',
		clients: 34,
		utilization: 68,
		health: 'Watch',
	},
	{
		name: 'AP-17',
		zone: 'Warehouse aisle B',
		band: '5 GHz',
		clients: 41,
		utilization: 81,
		health: 'Investigate',
	},
	{
		name: 'AP-22',
		zone: 'Checkout',
		band: '2.4 GHz',
		clients: 18,
		utilization: 77,
		health: 'Investigate',
	},
];

export const incidents = [
	{
		title: 'High co-channel interference',
		severity: 'High',
		location: 'Retail Store',
		action: 'Rebalance 2.4 GHz radios and reduce transmit power.',
	},
	{
		title: 'Roaming above 200 ms',
		severity: 'Medium',
		location: 'Checkout lane',
		action: 'Tune neighbor reports and validate 802.11r support.',
	},
	{
		title: 'DHCP handoff delay',
		severity: 'Medium',
		location: 'Warehouse VLAN 40',
		action: 'Review relay latency and failover scope response.',
	},
	{
		title: 'Guest SSID packet loss spike',
		severity: 'Low',
		location: 'Lobby',
		action: 'Retest captive portal path with WAN shaping disabled.',
	},
];
