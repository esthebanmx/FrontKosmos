import React from 'react';
import { Layout } from 'antd';
import { Header as MainHeader } from '../components/Header/Header';
import { Footer as MainFooter } from '../components/Footer/Footer';

import AppContent from './AppContent';

const { Content, Header, Footer } = Layout;

function MainLayout() {
    return (
        <Layout>
            <Header>
                <MainHeader />
            </Header>
            <Content>
                <AppContent />
            </Content>
            <Footer>
                <MainFooter />
            </Footer>
        </Layout>
    );
}

export default MainLayout;