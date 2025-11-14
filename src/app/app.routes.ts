import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { EntreprisesPage } from './pages/entreprises-page/entreprises-page';
import { ConsultantsPage } from './pages/consultants-page/consultants-page';
import { MissionsPage } from './pages/missions-page/missions-page';
import { MentionsLegales } from './pages/mentions-legales/mentions-legales';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'entreprises', component: EntreprisesPage },
    { path: 'consultants', component: ConsultantsPage },
    { path: 'missions', component: MissionsPage },
    { path: 'mentions-legales', component: MentionsLegales }
];
