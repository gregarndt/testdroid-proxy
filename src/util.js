export async function sleep(duration) {
  return new Promise(accept => setTimeout(accept, duration));
}

