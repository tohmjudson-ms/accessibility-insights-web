// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AndroidSetupStepConfigDeps } from 'electron/platform/android/setup/android-setup-steps-configs';
import { promptConnectedStartTesting } from 'electron/platform/android/setup/steps/prompt-connected-start-testing';
import { Mock, MockBehavior, Times } from 'typemoq';
import { checkExpectedActionsAreDefined } from './actions-tester';

describe('Android setup step: promptConnectedStartTesting', () => {
    it('has expected properties', () => {
        const deps = {} as AndroidSetupStepConfigDeps;
        const step = promptConnectedStartTesting(deps);
        checkExpectedActionsAreDefined(step, ['rescan']);
        expect(step.onEnter).not.toBeDefined();
    });

    it('onEnter transitions to detect-adb as expected', () => {
        const depsMock = Mock.ofType<AndroidSetupStepConfigDeps>(undefined, MockBehavior.Strict);
        depsMock.setup(m => m.stepTransition('detect-adb')).verifiable(Times.once());

        const step = promptConnectedStartTesting(depsMock.object);
        step.actions.rescan();

        depsMock.verifyAll();
    });
});