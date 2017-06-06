import React from "react";
import _min from "lodash/min";
import _isEmpty from "lodash/isEmpty";
import _flatten from "lodash/flatten";

const wp = {
	components: {},
};

const getTarget = ( target ) => {
	if( _isEmpty( wp.components[ target ] ) ) {
		wp.components[ target ] = {
			predecessors: [],
			successors: [],
			replacements: [],
			remove: false,
		};
	}

	return wp.components[ target ];
};

const registerExtension = ( type, target, origin, component, prio ) => {
	target = getTarget( target );
	component = Object.assign(
		{},
		component,
		{ key: origin }
	);
	target[ type ].splice( prio, 0, component );
};

export const insertBeforeComponent = ( target, origin, component, prio = 10 ) => {
	registerExtension( "predecessors", target, origin, component, prio );
};

export const insertAfterComponent = ( target, origin, component, prio = 10 ) => {
	registerExtension( "successors", target, origin, component, prio );
};

export const replaceComponent = ( target, origin, component, prio = 10 ) => {
	registerExtension( "replacements", target, origin, component, prio );
};

export const removeComponent = ( target, origin ) => {
	target = getTarget( target );
	target.remove = true;
	target.removedBy = origin;
};

const applyReplacement = ( WrappedComponent, replacements ) => {
	for ( let i = 0; i < replacements.length; i++ ) {
		let replacement = replacements[ i ];
		if ( replacement.$$typeof === WrappedComponent.$$typeof ) {
			WrappedComponent = replacement;
			break;
		}
	}

	return WrappedComponent;
};

export const extendComponent = ( WrappedComponent, name ) => {
	let target = getTarget( name );
	let predecessors = target.predecessors;
	let successors = target.successors;
	let replacements = target.replacements;

	if ( target.remove === true ) {
		WrappedComponent = <removed by={ target.removedBy } target={ name } key={ "removed-" + name } />;
	} else if ( ! _isEmpty( replacements ) ) {
		WrappedComponent = applyReplacement( WrappedComponent, replacements );
	}

	return [
		predecessors,
		WrappedComponent,
		successors,
	];
};

export default extendComponent;
