import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { SettingContextValues } from '../../src/components/context/SettingContext';
import { SettingContext } from '../../src/components/context/SettingContext';
import { Settings } from '../../src/components/settings/Settings';
import { defaultColorTheme, defaultCountdownTheme } from '../../src/static/themes';

const mockLocalStorageSetItem = vi.fn();
const mockLocalStorageGetItem = vi.fn();

Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: mockLocalStorageGetItem,
        setItem: mockLocalStorageSetItem,
        removeItem: vi.fn(),
        clear: vi.fn(),
    },
    writable: true,
});

describe('Settings Component', () => {
    const mockContextValues: SettingContextValues = {
        darkModeActive: false,
        updateDarkModeActive: vi.fn(),
        countdownColors: defaultCountdownTheme,
        updateCountdownColors: vi.fn(),
        colorTheme: defaultColorTheme,
        updateColorTheme: vi.fn(),
        overTimeAutomatic: false,
        updateOverTimeAutomatic: vi.fn(),
        showShortcuts: false,
        updateShowShortcuts: vi.fn(),
        toastPosition: 'bottomRight',
        updateToastPosition: vi.fn(),
        backgroundTheme: 'gray',
        updateBackgroundTheme: vi.fn(),
    };

    const renderWithContext = (contextValues: Partial<SettingContextValues> = {}) => {
        return render(
            <SettingContext.Provider value={{ ...mockContextValues, ...contextValues }}>
                <Settings />
            </SettingContext.Provider>,
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockLocalStorageGetItem.mockReturnValue(
            JSON.stringify({
                darkModeActive: false,
                countdownColors: defaultCountdownTheme,
                colorTheme: 'light',
                overTimeAutomatic: false,
            }),
        );
    });

    it('sollte localStorage.setItem aufrufen wenn Dark Mode Toggle geändert wird', () => {
        const mockUpdateDarkMode = vi.fn((value: boolean) => {
            mockContextValues.updateDarkModeActive(value);
            mockLocalStorageSetItem('darkModeActive', JSON.stringify(value));
        });

        renderWithContext({ updateDarkModeActive: mockUpdateDarkMode });

        const darkModeToggle = screen.getByRole('switch', { name: /Dark Mode/i });
        fireEvent.click(darkModeToggle);

        expect(mockLocalStorageSetItem).toHaveBeenCalledWith('darkModeActive', 'true');
        expect(mockUpdateDarkMode).toHaveBeenCalledWith(true);
    });
});
