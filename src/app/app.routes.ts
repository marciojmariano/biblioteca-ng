import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AlunoList } from './pages/alunos/list/list';
import { AlunoCreate } from './pages/alunos/create/create';
import { Alterar } from './pages/alunos/alterar/alterar';
import { TransporteList } from './pages/transporte/list/list';
import { TransporteCreate } from './pages/transporte/create/create';
import { TransporteAlter } from './pages/transporte/alter/alter';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'alunos', component: AlunoList},
    {path: 'alunos/cadastro', component: AlunoCreate},
    {path: 'alunos/alterar/:id', component: Alterar},
    {path: 'transporte', component: TransporteList},
    {path: 'transporte/cadastro', component: TransporteCreate},
    {path: 'transporte/alter/:id', component: TransporteAlter},
];
