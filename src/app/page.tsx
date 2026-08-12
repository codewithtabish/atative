import dynamic from 'next/dynamic';
import { Container } from '@/components/(app)/(common)/layout/container'
import { Button } from '@/components/ui/button'
import React from 'react'
import { ModeToggle } from '@/components/(app)/(common)/theme/mode-toggle';
import SiteTopHeader from '@/components/(app)/(common)/navbars/top-navbar';
import CategoryNavbar from '@/components/(app)/(common)/navbars/(category-navbar)/category-navbar';


const HomeScreen = () => {
  return (
    <Container>
        <SiteTopHeader/>
        <CategoryNavbar/>
        <hr />
        <ModeToggle/>
       
    </Container>
 
  )
}

export default HomeScreen
