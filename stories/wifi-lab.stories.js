/**
 * WiFi Lab stories.
 */

/**
 * External dependencies
 */
import { storiesOf } from '@storybook/react';

/**
 * Internal dependencies
 */
import WiFiLabApp from '../assets/js/components/wifi-lab/WiFiLabApp';

storiesOf( 'WiFi Lab', module ).add(
	'Command Center',
	() => {
		return <WiFiLabApp />;
	},
	{
		padding: 0,
	}
);
