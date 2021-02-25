describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });


  it('Volume Number Test', () => {
    const volume = '75';
    const volumeNumberElement = '#volume-number'
    cy.get(volumeNumberElement).clear().type(volume)
    .then(($el) => {
      expect($el).to.have.value(volume);
    });
  });

  it('Volume Slider Test', () => {
    const volume = 33;
    const volumeSliderElement = '#volume-slider'
    cy.get(volumeSliderElement).invoke('val', volume).trigger('input')
    .then(($el) => {
      expect($el).to.have.value(33);
    });
  });

  it('Volume Slider Test Correct Value', () => {
    const volume = 33;
    const volumeSliderElement = '#volume-slider'
    const audioElement = '#horn-sound'
    cy.get(volumeSliderElement).invoke('val', volume).trigger('input');

    cy.get(audioElement).then(($el) => {
      expect($el).to.have.prop('volume',0.33);
    });

  });

  it('Image Change Clicking Party Horn Button', () => {
    cy.get('#radio-party-horn').check();
    // check image
    cy.get('#sound-image').then(($el) => {
      expect($el).to.have.prop('src', 'http://127.0.0.1:5500/assets/media/images/party-horn.svg');
    });
    // check sound
    cy.get('#horn-sound').then(($el) => {
      expect($el).to.have.prop('src', 'http://127.0.0.1:5500/assets/media/audio/party-horn.mp3');
    });
  });

  it('Volume Image Change From Volume Change', () => {
    const mute = 0;
    const quiet = 1;
    const moderate = 34;
    const loud = 67;
    cy.get('#volume-slider').invoke('val', mute).trigger('input');
    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.prop('src', 'http://127.0.0.1:5500/assets/media/icons/volume-level-0.svg');
    });
    cy.get('#volume-slider').invoke('val', quiet).trigger('input');
    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.prop('src', 'http://127.0.0.1:5500/assets/media/icons/volume-level-1.svg');
    });
    cy.get('#volume-slider').invoke('val', moderate).trigger('input');
    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.prop('src', 'http://127.0.0.1:5500/assets/media/icons/volume-level-2.svg');
    });
    cy.get('#volume-slider').invoke('val', loud).trigger('input');
    cy.get('#volume-image').then(($el) => {
      expect($el).to.have.prop('src', 'http://127.0.0.1:5500/assets/media/icons/volume-level-3.svg');
    });
  });

  it('Disable Honk Button When Mute Volume', () => {
    const mute = 0;
    cy.get('#volume-slider').invoke('val', mute).trigger('input');
    cy.get('#honk-btn').then(($el) => {
      expect($el).to.have.prop('disabled', true);
    });
  });

  it('Disable Honk Button When Invalid Volume', () => {
    cy.get('#volume-number').clear().type('invalid input');
    cy.get('#honk-btn').then(($el) => {
      expect($el).to.have.prop('disabled', true);
    });
  });

  it('Disable Honk Button When Out of Bound Volume Number', () => {
    cy.get('#volume-number').invoke('val', 12321312).trigger('input');
    cy.get('input:invalid').should('have.length', 1);
    cy.get('#volume-number').then(($input) => {
        expect($input[0].validationMessage).to.eq('Value must be less than or equal to 100.')
    });
  });
});
