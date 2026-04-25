// Famous Meme Poses
export const POSES = {
  solo: [
    {
      id: 'meme_roll_safe',
      name: 'Roll Safe (Think)',
      description: 'The classic "thinking" meme with the finger to the temple.',
      outline: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke">
        <!-- Head -->
        <path d="M40 30 C50 30 55 20 55 10 C55 -5 25 -5 25 10 C25 20 30 30 40 30 Z" />
        <!-- Body -->
        <path d="M30 40 C20 45 10 60 10 100 L70 100 C70 80 65 55 50 40" />
        <!-- Arm & Finger pointing to head -->
        <path d="M65 100 C75 80 80 60 65 45 C60 40 50 35 50 25" />
        <circle cx="50" cy="25" r="2" fill="currentColor" />
      </svg>`
    },
    {
      id: 'meme_drake_reject',
      name: 'Hotline Bling',
      description: 'Drake rejecting something with his hand up.',
      outline: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke">
        <!-- Head turned -->
        <path d="M35 30 C45 28 50 18 45 5 C35 -5 10 -5 20 15 C25 25 30 30 35 30 Z" />
        <!-- Body -->
        <path d="M25 40 C15 45 5 60 5 100 L65 100 C65 80 60 55 45 40" />
        <!-- Hand blocking -->
        <path d="M50 80 C60 60 65 50 75 40" />
        <path d="M75 40 L85 30 M75 40 L85 45 M75 40 L85 55" />
      </svg>`
    },
    {
      id: 'meme_salt_bae',
      name: 'Salt Bae',
      description: 'Sprinkling imaginary salt elegantly over the frame.',
      outline: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke">
        <!-- Head with sunglasses -->
        <path d="M45 25 C55 25 60 15 60 5 C60 -10 30 -10 30 5 C30 15 35 25 45 25 Z" />
        <path d="M35 12 L55 12 M35 15 L55 15" stroke-width="3" />
        <!-- Body -->
        <path d="M35 30 C20 40 10 60 10 100 L70 100 C70 80 65 50 55 35" />
        <!-- Arm bent up, hand down -->
        <path d="M25 50 L10 35 L25 20" />
        <!-- Salt particles -->
        <circle cx="20" cy="30" r="1" fill="currentColor" />
        <circle cx="25" cy="40" r="1" fill="currentColor" />
        <circle cx="15" cy="35" r="1" fill="currentColor" />
        <circle cx="20" cy="45" r="1" fill="currentColor" />
        <circle cx="26" cy="50" r="1" fill="currentColor" />
      </svg>`
    }
  ],
  duo: [
    {
      id: 'meme_spiderman',
      name: 'Spider Point',
      description: 'Two Spidermen pointing fiercely at each other.',
      outline: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke">
        <!-- Left Spiderman -->
        <path d="M25 30 C35 30 38 20 38 10 C38 -5 15 -5 15 10 C15 20 18 30 25 30 Z" />
        <path d="M15 35 C5 40 0 55 0 100 L35 100 C35 70 30 50 25 40" />
        <!-- Left arm pointing right -->
        <path d="M25 45 L50 45" />
        
        <!-- Right Spiderman -->
        <path d="M75 30 C85 30 88 20 88 10 C88 -5 65 -5 65 10 C65 20 68 30 75 30 Z" />
        <path d="M65 35 C55 40 50 55 50 100 L100 100 C100 70 95 50 85 40" />
        <!-- Right arm pointing left -->
        <path d="M75 55 L45 55" />
      </svg>`
    },
    {
      id: 'meme_distracted',
      name: 'Distracted BF',
      description: 'One looking back distracted, the other looking angry.',
      outline: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke">
        <!-- BF Looking Left -->
        <path d="M65 30 C75 30 75 15 65 5 C50 5 50 30 65 30 Z" />
        <path d="M55 35 C45 40 40 55 40 100 L90 100 C90 70 85 50 75 40" />
        
        <!-- GF looking angry right -->
        <path d="M25 30 C35 30 38 20 38 10 C38 -5 15 -5 15 10 C15 20 18 30 25 30 Z" />
        <path d="M15 35 C5 40 0 55 0 100 L40 100 C40 70 35 50 25 40" />
        <!-- Angry GF hands on hips -->
        <path d="M15 45 L5 60 L15 80 M35 45 L45 60 L35 80" />
      </svg>`
    },
    {
      id: 'meme_titanic',
      name: 'King of World',
      description: 'The classic Titanic pose at the bow of the ship.',
      outline: `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke">
        <!-- Front Person (Arms Out) -->
        <path d="M50 30 C58 30 62 20 62 10 C62 0 38 0 38 10 C38 20 42 30 50 30 Z" />
        <path d="M40 35 C30 40 25 55 25 100 L75 100 C75 70 70 45 60 35" />
        <!-- Left arm -->
        <path d="M35 40 L5 45" />
        <!-- Right arm -->
        <path d="M65 40 L95 45" />

        <!-- Back Person (Holding waist) - Dimmed -->
        <path d="M60 15 C65 15 68 10 68 5 C68 -5 52 -5 52 5 C52 10 55 15 60 15 Z" opacity="0.4" />
        <path d="M68 20 C75 25 80 45 80 100 L65 100 C65 70 60 50 60 35" opacity="0.4" />
        <path d="M52 20 C45 25 40 45 40 100" opacity="0.4" />
        <path d="M68 30 L60 35 M52 30 L60 35" opacity="0.4" />
      </svg>`
    }
  ]
};
