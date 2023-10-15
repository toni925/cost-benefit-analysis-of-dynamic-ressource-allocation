import Startpage from './routes/+page.svelte'
import GeneralInformationPage from './routes/generalprojectinformation/+page.svelte'
import Researchphase from './routes/researchphase/+page.svelte'
import Transitionphase from './routes/transitionphase/+page.svelte'
import Deploymentphase from './routes/deploymentphase/+page.svelte'
import CostBenefitanalyse from './routes/costbenefitanalyse/+page.svelte'

export const routes = {
    '/': Startpage,
    '/generalprojectinformation': GeneralInformationPage,
    '/researchphase': Researchphase,
    '/transitionphase': Transitionphase,
    '/deploymentphase': Deploymentphase,
    '/costbenefitanalyse': CostBenefitanalyse

}