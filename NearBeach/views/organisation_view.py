from django.contrib.auth.decorators import login_required
from NearBeach.models import *
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.template import loader
from django.db.models import Sum, Q, Min
from NearBeach.forms import *
from NearBeach.user_permissions import return_user_permission_level
from django.views.decorators.http import require_http_methods


import json


@login_required(login_url='login',redirect_field_name="")
def new_organisation(request):
    """

    :param request:
    :return:
    """
    # Get user permission

    # Get templates
    t = loader.get_template('NearBeach/organisations/new_organisations.html')

    # Get Context
    c = {}

    return HttpResponse(t.render(c,request))


@require_http_methods(['POST'])
@login_required(login_url='login',redirect_field_name='')
def new_organisation_save(request):
    """

    :param request:
    :return:
    """
    permission_results = return_user_permission_level(request, None, 'organisation')

    if permission_results['organisation'] < 3:
        return HttpResponseRedirect(reverse('permission_denied'))

    # Get the data
    form = NewOrgnanisationForm(request.POST)
    if not form.is_valid():
        return HttpResponseBadRequest(form.errors)

    # Save the data
    organisation_submit = organisation(
        change_user=request.user,
        organisation_name=form.cleaned_data['organisation_name'],
        organisation_email=form.cleaned_data['organisation_email'],
        organisation_website=form.cleaned_data['organisation_website'],
    )
    organisation_submit.save()

    return HttpResponse(reverse('organisation_information',args={organisation_submit.organisation_id}))


@require_http_methods(['POST'])
@login_required(login_url='login',redirect_field_name="")
def organisation_duplicates(request):
    """

    :param request:
    :return:
    """

    # ADD IN USER PERMISSION CHECKS

    # Extract data from POST
    form = NewOrgnanisationForm(request.POST)
    if not form.is_valid():
        return HttpResponseBadRequest(form.errors)

    # Check to see if there are any matches
    organisation_results = organisation.objects.filter(
        Q(
            is_deleted="FALSE",
        ) & Q(
            Q(organisation_name__contains=form.cleaned_data['organisation_name']) |
            Q(organisation_website__contains=form.cleaned_data['organisation_website']) |
            Q(organisation_email__contains=form.cleaned_data['organisation_email'])
        )
    )

    return HttpResponse(serializers.serialize('json',organisation_results),content_type='application/json')


def organisation_information(request,organisation_id):
    """

    :param request:
    :param organisation_id:
    :return:
    """
    t = loader.get_template('NearBeach/organisations/organisation_information.html')

    c = {}

    return HttpResponse(t.render(c,request))
