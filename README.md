# DevFest Nantes 2027

Site statique de la conférence DevFest Nantes 2027, construit avec Astro 6 et
déployé sur Google App Engine.

## Développement

```bash
npm ci
npm run dev
npm run lint
npm run build
```

Le build est généré dans `out/`. Le script `postbuild` crée les redirections
des URL sans locale vers la locale française.

## Analytics Umami

Le tracker Umami Cloud est chargé uniquement sur le build de production depuis
`src/components/astro/Analytics.astro`.

- Site : `DevFest Nantes 2027`
- Website ID : `3962f1f9-2780-4bb2-ad18-bf194b8a4708`
- Domaine suivi : `devfest2027.gdgnantes.com`
- Tableau de bord : <https://cloud.umami.is>

L'intégration collecte les pages vues, les sources et campagnes UTM, les
appareils, les navigateurs, les pays, les Core Web Vitals, les clics de liens,
les boutons, les erreurs JavaScript anonymisées et les événements métier
suivants :

| Événement | Usage |
| --- | --- |
| `sponsor-interest` | Clic sur « Devenir sponsor » |
| `newsletter-signup` | Clic d'inscription à la newsletter |
| `contact-email` | Clic sur l'adresse de contact |
| `venue-directions` | Demande d'itinéraire |
| `photos-2025` / `videos-2025` | Consultation des contenus 2025 |
| `mobile-app-download` | Téléchargement iOS ou Android |
| `social-link` | Sortie vers un réseau social |
| `language-switch` | Changement de langue |
| `link-click` / `button-click` | Interaction générique |
| `client-error` | Erreur JavaScript ou chargement de ressource |

### Activer les replays et heatmaps

Le script `recorder.js` est déjà installé. L'activation se fait dans Umami :

1. Se connecter à <https://cloud.umami.is>.
2. Ouvrir **Websites**, puis modifier le site dont l'identifiant est indiqué
   ci-dessus.
3. Dans **Replays & Heatmaps**, activer **Replays** et **Heatmaps**.
4. Pour les replays, choisir le masquage **strict**, une durée maximale de
   5 minutes et un taux d'échantillonnage adapté au forfait.
5. Pour les heatmaps, choisir le taux d'échantillonnage, puis consulter
   **Heatmap** pour les vues clic et scroll.

Les replays ne sont conservés que 30 jours par Umami. Les pages de production
autorisent `https://cloud.umami.is` dans la directive CSP `frame-ancestors`,
afin que l'aperçu du site fonctionne derrière les heatmaps.

### Rapports recommandés

Dans **Insights**, créer au minimum :

- un objectif `sponsor-interest` ;
- un objectif `newsletter-signup` ;
- un funnel page d'accueil → `sponsor-interest` ;
- un funnel page d'accueil → `newsletter-signup`.

Les données détaillées se trouvent dans **Overview**, **Realtime**, **Events**,
**Sessions**, **Replays**, **Heatmap** et **Performance**. L'accès dépend du
compte ou de l'équipe Umami propriétaire du Website ID.
