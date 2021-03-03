import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin'

/**
 * @type {Cypress.PluginConfig}
 */
export default function (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Cypress.PluginConfigOptions {
  addMatchImageSnapshotPlugin(on, config)

  return config
}
