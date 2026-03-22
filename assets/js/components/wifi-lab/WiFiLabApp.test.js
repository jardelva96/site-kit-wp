/**
 * WiFi Lab app tests.
 */

/**
 * External dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Internal dependencies
 */
import WiFiLabApp from './WiFiLabApp';

describe( 'WiFiLabApp', () => {
	it( 'renders the main dashboard and changes site context', () => {
		render( <WiFiLabApp /> );

		expect(
			screen.getByText(
				/full wi‑fi validation app for coverage, speed, roaming and rf diagnostics/i
			)
		).toBeInTheDocument();
		expect(
			screen.getAllByText( /HQ - 5th Floor/i ).length
		).toBeGreaterThan( 0 );

		fireEvent.click(
			screen.getByRole( 'button', { name: /^Retail Store$/i } )
		);

		expect( screen.getAllByText( /Retail Store/i ).length ).toBeGreaterThan(
			0
		);
		expect( screen.getByText( /checkout zone/i ) ).toBeInTheDocument();
	} );

	it( 'switches test playbooks when clicking scenario tabs', () => {
		render( <WiFiLabApp /> );

		fireEvent.click(
			screen.getAllByRole( 'button', { name: /Spectrum Analysis/i } )[ 0 ]
		);

		expect(
			screen.getAllByText(
				/channel utilization, co-channel interference and non-wi-fi noise diagnostics/i
			).length
		).toBeGreaterThan( 0 );
	} );
} );
