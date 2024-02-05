<script>
  import "../app.css";
  import { StyleFromScheme } from "m3-svelte";
</script>

<StyleFromScheme
  lightScheme={{"primary":4284569232,"onPrimary":4294967295,"primaryContainer":4293320447,"onPrimaryContainer":4280095048,"inversePrimary":4291542783,"secondary":4284504945,"onSecondary":4294967295,"secondaryContainer":4293320697,"onSecondaryContainer":4280097067,"tertiary":4286337635,"onTertiary":4294967295,"tertiaryContainer":4294957541,"onTertiaryContainer":4281340191,"error":4290386458,"onError":4294967295,"errorContainer":4294957782,"onErrorContainer":4282449922,"background":4294834431,"onBackground":4280032032,"surface":4294834431,"onSurface":4280032032,"surfaceVariant":4293320940,"onSurfaceVariant":4282926414,"inverseSurface":4281413430,"inverseOnSurface":4294242295,"outline":4286150015,"outlineVariant":4291413200,"shadow":4278190080,"scrim":4278190080,"surfaceDim":4292729056,"surfaceBright":4294834431,"surfaceContainerLowest":4294967295,"surfaceContainerLow":4294439674,"surfaceContainer":4294044916,"surfaceContainerHigh":4293650158,"surfaceContainerHighest":4293321193,"surfaceTint":4284569232}}
  darkScheme={{"primary":4291542783,"onPrimary":4281477214,"primaryContainer":4282990198,"onPrimaryContainer":4293320447,"inversePrimary":4284569232,"secondary":4291478492,"onSecondary":4281478721,"secondaryContainer":4282926168,"onSecondaryContainer":4293320697,"tertiary":4293834955,"onTertiary":4282983732,"tertiaryContainer":4284627787,"onTertiaryContainer":4294957541,"error":4294948011,"onError":4285071365,"errorContainer":4287823882,"onErrorContainer":4294957782,"background":4279505688,"onBackground":4293321193,"surface":4279505688,"onSurface":4293321193,"surfaceVariant":4282926414,"onSurfaceVariant":4291413200,"inverseSurface":4293321193,"inverseOnSurface":4281413430,"outline":4287860633,"outlineVariant":4282926414,"shadow":4278190080,"scrim":4278190080,"surfaceDim":4279505688,"surfaceBright":4282005566,"surfaceContainerLowest":4279176467,"surfaceContainerLow":4280032032,"surfaceContainer":4280295204,"surfaceContainerHigh":4281018671,"surfaceContainerHighest":4281742394,"surfaceTint":4291542783}} />

<svelte:head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
  <title>// Tasks //</title>
</svelte:head>

<slot />
