<template>
  <NuxtLoadingIndicator color="#000" />
  <slot />
  <ClientOnly>
    <CityPanel />
    <CityPopup />
    <UIToastCookie />
    <FormPanelFeedback />
    <NavBarDefault />
  </ClientOnly>
</template>
