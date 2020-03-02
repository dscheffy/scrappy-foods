# Buildable Forms

I could go ahead and create a bunch of custom forms for tracking details myself (since there will likely only ever be one or two users), but it would be nice if users could construct their own forms based out of a few standard input types:

* checklist: keep track of a list of things you'd like to do on semi regular basis -- a glorified todo list
* likert scales: basically radio buttons rather than a check list -- a checklist is ultimately just shorthand for a lot of likert scales where the response is either yes or no, but what if you've like to track greater details like how happy do you feel today? 
* camera: take a picture, it'll last longer -- I'd like to offer this with an overlay guide option for composing things like timelapse videos, or for making it easier to take consistent pictures of meals (with something like a hand for scale)
* text: free hand notes
* numeric: this could be anything from a weight to a count -- the input definition should specify the unit (or unit type for conversion?)
* unit type: based on my above note, we might want to templatize the concept of numeric measurement type -- so the type `weight` could have available units of `pounds`, `kilograms`, `stone` for measuring the weights of people, but for meals/ingredients you'd probably be more interested in using the units `ounces`, `grams`.

I'm going to start with the checklist input for now, but I want to make it templatizable following a standard API flow. I'm not going to worry about the template builder just yet, but I imagine the general design on the backend will be a set of `json` templates that users can build, save and eventually share or publish at which point other users might be able to copy and edit the original template. 

## Template Mutability

Given that somebody might want to modify an existing template, but there might already be data collected using that original template, I think we should make the template definitions themselves fairly immutable.

We could id them with something like a hash of the canonical json content, but _canonical json_ isn't 100% well defined. For now let's just say that we'll `id` them, and that no two templates with the same id should have the same content -- ever -- as in the content of a form template with id x today should be the same as the content of a form template with id x from a year ago.

That rule allows us to separate the contents of the saved form from the contents of the form template that describes the metadata for that form. 

### Handling Mutations of Immutable Templates

While the templates themselves should be immutable, it is normal to expect that users will want to edit them. I think we should handle this by simply maintaining a reference to the template that the new template was modified from. We can presume that a modified template will still bare some resemblance to the original template that was modified meaning that some portion of the data that spans instances of these forms is still comparable. 

For instance, suppose I create a checklist to track 10 activities, but after a few months I decide to add a few new activities and remove some of the old ones. While it's important to maintain the old metadata definition, we still want to be able to treat these two sets of data as a single time series for analytics purposes.

## Data Model

We'll store the templates and the filled out form instances themselves all in firestore. Public templates can be published to a `template` collection. User templates will sit on the user collection. I don't know just yet how we'd handle private sharing of templates, but publishing would be a matter of copying a template from a users collection out to the template collection and "using" a public template would pretty much be the reverse process. 

The user collection should keep a copy of all of the templates that the user has ever used -- as in, the user has filled out a form using that template. This way all of the metadata necessary to describe any data in the user collection is also in the user collection. This does not mean that all of the templates in the user collection should be _usable_. If a user modifies a template, they probably don't want to see the old version anymore in their activity tracking drop down. It also means that not all templates that will necessarily be used -- for instance, if a user copies a public template and immediately modifies it without ever using it to enter an activity, then the original was never used by the user and doesn't necessarily need to be maintained in the user collection. 

So, we probably want a mechanism for _muting_ templates and we want to automatically use that mechanism for muting older versions of modified templates. 	

## Rendering

Rendering a template requires two things -- the template definition and the form content. In react speak I think this is a bit like saying `props` and `state`. I'm not looking to worry about automatically updating the backend with every keystroke -- I'm happy to have an edit/save(/cancel) set of buttons that allows a user to toggle between view and edit modes and only saves changes when the user actively decides to. Creating a new instance should be as simple as editing an empty/null copy. 

### Inputs

A template is simply an ordered list (array) of inputs. Each is an object with a type and a type specific set of details. For instance: 

    {
      "id": "abcdefg",
      "previous": "zyxwvu", 
      "title": "My Checklist", 
      "inputs": [{
        "type": "checklist", 
        "items": ["hello", "world"]
      }]
    }