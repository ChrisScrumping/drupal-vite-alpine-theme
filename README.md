# My Theme

Generated from starterkit_theme. Additional information on generating themes can be found in the [Starterkit documentation](https://www.drupal.org/docs/core-modules-and-themes/core-themes/starterkit-theme).

This is an example theme that shows how is possible to use Vite with alpine.js in Drupals new Single Directory Components. It worth looking at https://github.com/cosmicdreams/drupal-storybook as the base for Drupal so you can see how to use these components with Storybook.

With Alpinejs you could just add the CDN link to your libraries as per below but I wanted to have the option of installing locally and not having to use a CDN.

```
alpine:
  version: VERSION
  js:
    https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js: {
       attributes: { defer: true }
    }
```

I use docksal for local development.

```
git clone 'git clone https://github.com/cosmicdreams/drupal-storybook.git'
cd drupal-storybook && fin p start && fin composer i && yarn
```

Edit the web/sites/cl_server_dev.services.yml file to correct your local domain, I just set it to '*' locally as security is not an issue.

Update the DB settings (I like to have them in the local.settings.php)

Finish off installing Drupal as normal at yourdomain.com/core/install.php and install the required modules
  Single Directory Components
  Component Libraries: Generator 	
  Component Libraries: Server
  Vite


## Dev

Inside the theme folder

```
yarn && yarn dev
```

This will install the npm packages and start the vite server, the [Vite Drupal Module](https://www.drupal.org/project/vite) uses the libraries to map the local files to the vite server (see network tab in dev tools). Now when you make a change to the CSS you should see it in Druapl instantly. Don't forget to clear the caches when setting this up.

For convience the alpine component is already added to the ```web/themes/mytheme/templates/layout/page.html.twig``` file.

## Production

Once you are ready to build
```
yarn build
```

This does two things

Vite build which will build the files into the dist folder with a manifest.json file. The [Vite module](https://www.drupal.org/project/vite) uses the manifest file to route the libraries required for production.

Gulp build which moves the component CSS files into the componenet folders (Drupal SDC handles these for us). It also updates the manifest.json file to remove the component files.

## New components

When adding a new component you can use the command:
```
fin drush generate theme:sdc:component 
```
If using Storybook you can apply the [Storybook patch](https://www.drupal.org/project/cl_generator/issues/3363708)

Once generated you need to let Vite know about the files in the main.js file ```import '../../components/alpine/alpine.scss'```. In this case we don't need to compile the JS but in theory you could use the same process.

## Other notes

### Vite module in prod

It might be possible to remove the Vite module in production and create a production libraries file on build that maps directly to the dist folder, this way you can reduced the modules needed on live.

### Generting the base theme

This theme was generated using the new D10 generate theme command:
```
fin exec php core/scripts/drupal generate-theme mytheme
```

## Using gulp

It would be better if I could remove the dependency on gulp for moving and tidying up but I can't see how its possible using Vite, any suggestions? I have also only done limited testing on this so it's probably fragile.