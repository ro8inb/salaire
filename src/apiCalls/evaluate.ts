import { useResponsesStore } from '@/stores/responses';
import { useInformationsStore } from '@/stores/informations';
import { useSalesStore } from '@/stores/sales';

const baseApiUrl = import.meta.env.VITE_API_BASE_URL;

export async function evaluate(sales: Number) {
    const responsesStore = useResponsesStore();
    const informationsStore = useInformationsStore();
    const salesStore = useSalesStore();
    const situation = {
        "dirigeant . auto-entrepreneur . chiffre d'affaires": "" + salesStore.stateSales.amount + " €/" + informationsStore.state.paymentPeriod + "",
        "entreprise . activité . nature": "'" + informationsStore.state.activityType + "'",
        "entreprise . activités . service ou vente": informationsStore.state.activityTypeMain ?? 'vente',
        "entreprise . activité . nature . libérale . réglementée": informationsStore.state.activityTypeRegulated,
        "entreprise . catégorie juridique": "'EI'",
        "entreprise . catégorie juridique . EI . auto-entrepreneur": "'oui'",
        "établissement . commune . département": informationsStore.state.activityDepartment,
        "entreprise . date de création": informationsStore.state.activityCreationDate,
        "entreprise . activités . revenus mixtes": informationsStore.state.mixedRevenues,
        "dirigeant . auto-entrepreneur . éligible à l'ACRE": "oui",
        "dirigeant . exonérations . ACRE": informationsStore.state.activityExemption,
        "dirigeant . auto-entrepreneur . impôt . versement libératoire": informationsStore.state.taxPaymentInFull,
        "impôt . méthode de calcul": "'" + informationsStore.state.taxCalculationMethod + "'"
    }
    if (informationsStore.state.taxCalculationMethod === "taux personnalisé") {
        //@ts-ignore
        situation["impôt . taux personnalisé"] = informationsStore.state.withHoldingTaxRate;
    }

    try {
        const responseEvaluate = await fetch(baseApiUrl + "/evaluate", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "situation": situation,
                "expressions": [
                    {
                        "valeur": "dirigeant . auto-entrepreneur . cotisations et contributions",
                        "unité": "€/" + informationsStore.state.paymentPeriod + ""
                    },
                    {
                        "valeur": "dirigeant . rémunération . impôt",
                        "unité": "€/" + informationsStore.state.paymentPeriod + ""
                    },
                    {
                        "valeur": "dirigeant . auto-entrepreneur . revenu net . après impôt",
                        "unité": "€/" + informationsStore.state.paymentPeriod + ""
                    },
                ]
            })
        });
        if (responseEvaluate.ok) {
            const resultEvaluate = await responseEvaluate.json();
            responsesStore.taxAmount = resultEvaluate.evaluate[0].nodeValue
            responsesStore.personnalTaxAmount = resultEvaluate.evaluate[1].nodeValue
            responsesStore.incomeAfterTax = resultEvaluate.evaluate[2].nodeValue + resultEvaluate.evaluate[1].nodeValue
            responsesStore.incomeAfterPersonnalTax = resultEvaluate.evaluate[2].nodeValue
        } else {
            console.log(responseEvaluate)
        }
    } catch (error) {
        console.error('Fetch', error);
    }
}