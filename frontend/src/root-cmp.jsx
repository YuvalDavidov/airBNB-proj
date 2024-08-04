import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { useSelector } from 'react-redux'
import { toggleExpand } from './store/stay.actions'
import { Dashboard } from './pages/dashboard'
import { StayEdit } from './cmps/stay-edit'
import { Listings } from './cmps/listings'
import { Reservations } from './cmps/reservations'
import { MobileNav } from './cmps/mobile-nav'
import { UserMsg } from './cmps/user-msg'

export function RootCmp() {
  const { isHeadFilterExpanded } = useSelector(
    (storeState) => storeState.stayModule
  )
  const { isMobile } = useSelector((storeState) => storeState.systemModule)

  function onToggleExpand() {
    toggleExpand(false)
  }
  function dontDoNothing() {
  }
  return (
    <div onScroll={onToggleExpand}>
      <AppHeader />
      <div onClick={isHeadFilterExpanded ? onToggleExpand : dontDoNothing} className={(isHeadFilterExpanded) ? 'back-screen' : ''}></div>

      <main
        // className={`main-layout ${isHeadFilterExpanded ? 'expanded' : ''} `}
        className={`${isMobile ? '' : 'main-layout'} ${isHeadFilterExpanded ? 'expanded' : ''} `}
      >


        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
          <Route element={<Dashboard />} path="/dashboard">
            <Route element={<StayEdit />} path="/dashboard" />
            <Route element={<StayEdit />} path="/dashboard/:stayId" />
            <Route element={<Listings />} path="/dashboard/listings" />
            <Route element={<Reservations />} path="/dashboard/reservations" />

          </Route>

          <Route path='user/:id' element={<UserDetails />} />
        </Routes>
      </main>
      < UserMsg />
      {!isMobile && <AppFooter />}
      {isMobile && <MobileNav />}
    </div>
  )
}
