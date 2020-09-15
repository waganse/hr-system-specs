import { create } from '@storybook/theming/create';

export default create({
  // UI
  appBg: 'white',
  appContentBg: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAe1BMVEXT09Pu7u75+fn////i4uL29vbr6+ve3t7b29vn5+f6+vr39/fw8PDy8vLq6uro6Ojj4+P4+Pjh4eHs7Oz19fX9/f38/Pzv7+/d3d3x8fHk5OT09PT7+/vf39/m5ubZ2dnV1dXl5eXa2trz8/Pp6eng4ODt7e3Y2NjX19c2z0quAAABH0lEQVR42n2RwZaCMAxFm4YWECpQIAI6KIo6//+F8+JiVj2yeKf3sMhNnjFkmTN2nnLGV3iyQLApD+BUmMojU2G4Do7oGPBuWuqA7Cj2+scWwyiniWUOi4SztPMw2uLMxvvIzJcfTL6smNxcLXCFAfcDcypMqPFKhVF3unV4ZjDpgOxuBDZlhYkLnVmKeZSQH2QetirAYJmsLoAbzLoF3ckC9Qa6AKfCsMA1FUbdiQblx5U6IIx81D97gxtEjxu0D9ygDzDadxg8o9UFYNDrFsecLFANMiCn4ns/jspNW2lxAyC7curU4LXCYGtgUNYwqE8weK3/LYi2IJ8W3hb4aUFbScX3fhxlOzA0MACyy6IaZIKJz4AWfmES7gyOAv4DGvcZW9Hmo7IAAAAASUVORK5CYII=")',
  appBorderColor: 'gray',
  appBorderRadius: 4,

  // Typography
  fontBase: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN", Meiryo, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#888',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#666',
  barSelectedColor: '#333',
  barBg: '#f7f7f7',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Design System | Air Design',
  brandUrl: 'https://airdesign.ai/',
  brandImage: 'https://airdesign.ai/190805-lp-a/assets/air-40.png',
});