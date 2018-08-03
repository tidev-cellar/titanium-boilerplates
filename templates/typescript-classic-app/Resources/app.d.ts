/// <reference types="titanium" />
/**
 * Create a new `Ti.UI.TabGroup`.
 */
declare var tabGroup: Titanium.UI.TabGroup;
/**
 * Creates a new Tab and configures it.
 *
 * @param title The title used in the `Ti.UI.Tab` and it's included `Ti.UI.Window`
 * @param message The title displayed in the `Ti.UI.Label`
 * @param icon The icon used in the `Ti.UI.Tab`
 */
declare function createTab(title: string, message: string, icon: string): Titanium.UI.Tab;
