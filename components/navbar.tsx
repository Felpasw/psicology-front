import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { Button } from '@nextui-org/button'

export default function App() {
  return (
    <Navbar>
      <NavbarBrand>
        <img src='./logo.png' alt='' className='max-w-32' />
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'></NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem>
          <Button color='primary' href='#' variant='flat'>
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
