import Button from './Button';

export default function ComponentsOverrides() {
  const buttonOverrides = Button();

  return { ...buttonOverrides };
}
