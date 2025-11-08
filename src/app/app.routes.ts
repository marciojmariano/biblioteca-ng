import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AlunoList } from './pages/alunos/list/list';
import { AlunoCreate } from './pages/alunos/create/create';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'alunos', component: AlunoList},
    {path: 'alunos/cadastro', component: AlunoCreate},
];
