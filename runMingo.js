const mingo = require('mingo');
const core = require('mingo/core');
const pipelineOperators = require('mingo/operators/pipeline');
const expressionOperators = require('mingo/operators/expression');
const accumulatorOperators = require('mingo/operators/accumulator');

const Aggregator = mingo.Aggregator;
const useOperators = core.useOperators;
const OperatorType = core.OperatorType;

/**
 * @typedef RunMingoResult
 * @property {any} [value] - the result of the runMingo calculation
 * @property {Object} [error] - an error object if occurred.
 */

/**
 * Runs the mingo calculation and returns the result.
 * @param  {Object[]} script - the aggregation array in mingo
 * @param  {Object} data - the data source object
 * @returns {RunMingoResult} - Object with either value property or error property.
 */
const runMingo = (script, data) => {
	useOperators(OperatorType.PIPELINE, pipelineOperators);
	useOperators(OperatorType.ACCUMULATOR, accumulatorOperators);
	useOperators(OperatorType.EXPRESSION, expressionOperators);
	try {
		const calculator = new Aggregator(script);
		const info = Array.isArray(data) ? data : [data];
		const [result] = calculator.run(info);
		return { value: result.value };
	} catch (error) {
		return { error };
	}
};

module.exports = runMingo;