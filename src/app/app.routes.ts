import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { AlunoList } from './pages/alunos/list/list';
import { AlunoCreate } from './pages/alunos/create/create';
import { Alterar } from './pages/alunos/alterar/alterar';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'alunos', component: AlunoList},
    {path: 'alunos/cadastro', component: AlunoCreate},
    {path: 'alunos/alterar/:id', component: Alterar},

];
