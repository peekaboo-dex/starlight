/* eslint-disable no-param-reassign, no-shadow, no-unused-vars */

import cloneDeep from 'lodash.clonedeep';
import logger from '../../../utils/logger.mjs';
import {
  collectAllStateVariableBindings,
  queryScopeAncestors,
  findReferencedBinding,
  getScopeAncestorOfType,
} from '../../../traverse/scope.mjs';
import circuitTypes from '../../../types/circuit-types.mjs';
import { traverse, traverseNodesFast } from '../../../traverse/traverse.mjs';


export default {
  SourceUnit: {
    enter(path, state, scope) {},

    exit(path, state, scope) {},
  },

  PragmaDirective: {
    // TODO: We should probably check that the `.zsol` Pragma is 'supported'. The output Solidity's pragma will be limited to the latest-supported boilerplate code.
    // However, for now, we'll just inherit the Pragma of the original and hope.
    enter(path, state, scope) {},
    exit(path, state, scope) {},
  },

  ContractDefinition: {
    enter(path, state, scope) {},

    exit(path, state, scope) {},
  },

  FunctionDefinition: {
    enter(path, state, scope) {},

    exit(path, state, scope) {},
  },

  ParameterList: {
    enter(path) {},

    exit(path) {},
  },

  Block: {
    enter(path) {},

    exit(path) {},
  },

  VariableDeclarationStatement: {
    enter(path) {},

    exit(path) {},
  },

  BinaryOperation: {
    enter(path) {},

    exit(path) {},
  },

  Assignment: {
    enter(path, state, scope) {},

    exit(path, state, scope) {},
  },

  ExpressionStatement: {
    enter(path, state, scope) {},

    exit(node, parent) {},
  },

  VariableDeclaration: {
    enter(path, state, scope) {},

    exit(path, state, scope) {},
  },

  ElementaryTypeName: {
    enter(path) {},

    exit(path) {},
  },

  Identifier: {
    enter(path, state, scope) {},

    exit(path, state, scope) {
      const { node, parent } = path;
      const varDec = findReferencedBinding(scope, node);
      if (varDec.stateVariable) {
        // node is decorated
        if (!varDec.secretVariable && node.isUnknown)
          throw new Error(`Identifier ${node.name} is marked as unknown but is not secret.`);
        if (!varDec.secretVariable && node.isKnown)
          logger.warn(
            `PEDANTIC: a conventional smart contract state variable (${node.name}) is 'known' by default`,
          );
      }
    },
  },

  Literal: {
    enter(path) {},

    exit(path) {},
  },
};
