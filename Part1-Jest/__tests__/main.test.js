const formatVolumeIconPath = require('../assets/scripts/main');

describe('formatVolumeIconPath testing', () => {

  const iconPath = './assets/media/icons/volume-level';
  
  test('Case > 66', () => {
    expect(formatVolumeIconPath(67)).toBe(iconPath + '-3.svg');
  });

  test('Case > 33', () => {
    expect(formatVolumeIconPath(34)).toBe(iconPath + '-2.svg');
  });

  test('Case > 0', () => {
    expect(formatVolumeIconPath(1)).toBe(iconPath + '-1.svg');
  });

  test('Case otherwise', () => {
    expect(formatVolumeIconPath(0)).toBe(iconPath + '-0.svg');
  });

});