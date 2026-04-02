<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  let konamiIndex = 0;
  let secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiActivated = $state(false);
  let showSecret = $state(false);
  let cursorX = $state(0);
  let cursorY = $state(0);

  onMount(() => {
    if (!browser) return;

    console.log(`
%c🏃💨 Running Club Site - Debug Mode Activated!
%cDid you know? Our fastest runner can do a mile in 4:36! Now that's speed!
%cHint: Try the Konami Code... 👆👆👇👇👈👉👈👉BA
    `, 'color: #b72025; font-size: 16px; font-weight: bold;', 'color: #333;', 'color: #666; font-style: italic;');

    document.addEventListener('keydown', (e) => {
      if (e.key === secretCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === secretCode.length) {
          konamiActivated = true;
          setTimeout(() => {
            konamiActivated = false;
          }, 3000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });

    document.addEventListener('click', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });
  });

  function toggleSecret() {
    showSecret = !showSecret;
  }
</script>

{#if konamiActivated}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
    <div class="animate-bounce text-center">
      <div class="text-8xl">🎉</div>
      <h2 class="mt-4 text-4xl font-bold text-white">SPEED BOOST ACTIVATED!</h2>
      <p class="mt-2 text-xl text-white/80">You unlocked the secret speed mode! 🏃💨💨</p>
      <p class="mt-4 text-sm text-white/60">(This does nothing, but you feel faster, right?)</p>
    </div>
  </div>
{/if}

<button
  onclick={toggleSecret}
  class="fixed bottom-4 right-4 z-40 opacity-0 transition-opacity hover:opacity-100"
  aria-label="Secret button"
>
  <div class="h-3 w-3 rounded-full bg-primary-600 animate-pulse"></div>
</button>

{#if showSecret}
  <div class="fixed bottom-8 right-8 z-50 max-w-xs rounded-lg bg-white p-4 shadow-xl">
    <h3 class="font-bold text-primary-700">🤫 Shhh! You found it!</h3>
    <p class="mt-2 text-sm text-gray-600">
      Here are some secrets:
    </p>
    <ul class="mt-2 list-inside list-disc text-xs text-gray-500">
      <li>↑↑↓↓←→←→BA - The magic code</li>
      <li>Click the homepage runner 10 times</li>
      <li>Check the console on about page</li>
      <li>Found a bug? That's not a feature...</li>
    </ul>
    <button 
      onclick={toggleSecret}
      class="mt-3 text-xs text-gray-400 hover:text-gray-600"
    >
      [close]
    </button>
  </div>
{/if}

<span 
  class="pointer-events-none fixed z-30 text-2xl transition-all duration-100"
  style="left: {cursorX}px; top: {cursorY}px; transform: translate(-50%, -50%);"
>
  🏃
</span>