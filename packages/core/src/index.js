/** @license MIT License (c) copyright 2016 original author or authors */
/* eslint-disable import/first */
import { curry2, curry3 } from '@most/prelude'

export { empty } from './source/empty'
export { never } from './source/never'
export { now } from './source/now'
export { at } from './source/at'

export { periodic } from './source/periodic'

export { newStream } from './source/newStream'

import { zipItems as _zipItems, withItems as _withItems } from './combinator/zipItems'
export const zipItems = curry3(_zipItems)
export const withItems = curry2(_withItems)

// -----------------------------------------------------------------------
// Observing

import { runEffects as _runEffects } from './runEffects'
import { run as _run } from './run'

export const runEffects = curry2(_runEffects)
export const run = curry3(_run)

// -------------------------------------------------------

import { withLocalTime as _withLocalTime } from './combinator/withLocalTime'

export const withLocalTime = curry2(_withLocalTime)

// -------------------------------------------------------

import { loop as _loop } from './combinator/loop'

export const loop = curry3(_loop)

// -------------------------------------------------------

import { scan as _scan } from './combinator/scan'

export const scan = curry3(_scan)

// -----------------------------------------------------------------------
// Extending

import { startWith as _startWith } from './combinator/startWith'

export const startWith = curry2(_startWith)

// -----------------------------------------------------------------------
// Transforming

import { map as _map, constant as _constant, tap as _tap } from './combinator/transform'
import { ap as _ap } from './combinator/applicative'

export const map = curry2(_map)
export const constant = curry2(_constant)
export const tap = curry2(_tap)
export const ap = curry2(_ap)

// -----------------------------------------------------------------------
// FlatMapping

import { chain as _chain, join } from './combinator/chain'
export const chain = curry2(_chain)
export { join }

import { continueWith as _continueWith } from './combinator/continueWith'
export const continueWith = curry2(_continueWith)

import { concatMap as _concatMap } from './combinator/concatMap'
export const concatMap = curry2(_concatMap)

// -----------------------------------------------------------------------
// Concurrent merging

import { mergeConcurrently as _mergeConcurrently, mergeMapConcurrently as _mergeMapConcurrently } from './combinator/mergeConcurrently'

export const mergeConcurrently = curry2(_mergeConcurrently)
export const mergeMapConcurrently = curry3(_mergeMapConcurrently)

// -----------------------------------------------------------------------
// Merging

import { merge as _merge, mergeArray } from './combinator/merge'

export const merge = curry2(_merge)
export { mergeArray }

// -----------------------------------------------------------------------
// Combining

import { combine as _combine, combineArray as _combineArray } from './combinator/combine'

export const combine = curry3(_combine)
export const combineArray = curry2(_combineArray)

// -----------------------------------------------------------------------
// Sampling

import { sample as _sample, snapshot as _snapshot } from './combinator/snapshot'

export const sample = curry2(_sample)
export const snapshot = curry3(_snapshot)

// -----------------------------------------------------------------------
// Zipping

import { zip as _zip, zipArray as _zipArray } from './combinator/zip'

export const zip = curry3(_zip)
export const zipArray = curry2(_zipArray)

// -----------------------------------------------------------------------
// Switching

export { switchLatest } from './combinator/switch'

// -----------------------------------------------------------------------
// Filtering

import { filter as _filter, skipRepeats, skipRepeatsWith as _skipRepeatsWith } from './combinator/filter'

export const filter = curry2(_filter)
export { skipRepeats }
export const skipRepeatsWith = curry2(_skipRepeatsWith)

// -----------------------------------------------------------------------
// Slicing

import { take as _take, skip as _skip, slice as _slice, takeWhile as _takeWhile, skipWhile as _skipWhile, skipAfter as _skipAfter } from './combinator/slice'

export const take = curry2(_take)
export const skip = curry2(_skip)
export const slice = curry3(_slice)
export const takeWhile = curry2(_takeWhile)
export const skipWhile = curry2(_skipWhile)
export const skipAfter = curry2(_skipAfter)

// -----------------------------------------------------------------------
// Time slicing

import { until as _until, since as _since, during as _during } from './combinator/timeslice'

export const until = curry2(_until)
export const since = curry2(_since)
export const during = curry2(_during)

// -----------------------------------------------------------------------
// Delaying

import { delay as _delay } from './combinator/delay'

export const delay = curry2(_delay)

// -----------------------------------------------------------------------
// Rate limiting

import { throttle as _throttle, debounce as _debounce } from './combinator/limit'

export const throttle = curry2(_throttle)
export const debounce = curry2(_debounce)

// -----------------------------------------------------------------------
// Awaiting Promises

export { fromPromise, awaitPromises } from './combinator/promises'

// -----------------------------------------------------------------------
// Error handling

import { recoverWith as _recoverWith, throwError } from './combinator/errors'

export const recoverWith = curry2(_recoverWith)
export { throwError }

// -----------------------------------------------------------------------
// Multicasting

export { multicast, MulticastSource } from './combinator/multicast'

// ----------------------------------------------------------------------
import {
  propagateTask as _propagateTask,
  propagateEventTask as _propagateEventTask,
  propagateErrorTask as _propagateErrorTask,
  propagateEndTask
} from './scheduler/PropagateTask'

export const propagateTask = curry3(_propagateTask)
export const propagateEventTask = curry2(_propagateEventTask)
export const propagateErrorTask = curry2(_propagateErrorTask)
export { propagateEndTask }
