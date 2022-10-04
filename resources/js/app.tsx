require('./bootstrap');

import { InertiaProgress } from '@inertiajs/progress';
import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
InertiaProgress.init();

createInertiaApp({
	resolve: name => import(`./Pages/${name}`),
	setup({ el, App, props }) {
		render(<App {...props} />, el);
	}
});
